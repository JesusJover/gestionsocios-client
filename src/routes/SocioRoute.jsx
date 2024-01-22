import Header from "../components/Header"
import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"
import { IoReceipt, IoCard, IoPencil, IoMail } from "react-icons/io5"
import Footer from "../components/Footer"
import useCheckAuth from "../hooks/useCheckAuth"
import { useAuth0 } from "@auth0/auth0-react"

export default function SocioRoute() {
   const navigate = useNavigate()
   const { getAccessTokenSilently } = useAuth0()

   const location = useLocation()
   const socio = location.state.socio
   const socios = location.state.socios

   const [loading, setLoading] = useState(false)
   const [response, setResponse] = useState('Enviar carnet SMS')

   useCheckAuth()

   function sendSMS() {
      if (response === "✔️") return
      setLoading(true)
      getAccessTokenSilently()
      .then((token) => {
         return fetch("https://gestionasociacion-api.fly.dev/sendcarnet/" + socio.IdSocio, {
         // return fetch("http://localhost:3000/sendcarnet/" + socio.IdSocio, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
            }
         })
      })
      .then((response) => {
         if (response.status === 200) {
            setLoading(false)
            setResponse("✔️")
         } else {
            setLoading(false)
            setResponse("❌")
         }
      })
      .catch((response) => {
         setLoading(false)
         setResponse("❌")
      })
   }

   return (
      <div className="w-screen h-screen p-4">
         <Header />

         <main className="mt-[100px] flex flex-col items-center font-mono">
            <h2 className="text-2xl text-center">Socio #{socio.IdSocio} {socio.NombreTitular.toUpperCase()} {socio.ApellidosTitular.toUpperCase()}</h2>

            {socio.cuotaPagada &&
               <div className="text-center text-lg inline-block mt-3 py-1 px-2 bg-green-200 rounded-lg">
                  Cuota pagada
               </div>
            }

            {!socio.cuotaPagada &&
               <div className="text-center text-lg inline-block mt-3 py-1 px-2 bg-red-200 rounded-lg">
                  {socio.ultimaCuotaPagada && `Cuota caducada en ${socio.fechaCaducidad.getFullYear()}`}
                  {!socio.ultimaCuotaPagada && `Sin cuotas`}
               </div>
            }

            <h4 className={`mt-3 text-xl text-center`}>Teléfono: {socio.Telefono ? socio.Telefono : (<span className="text-red-500">(no almacenado)</span>)}</h4>
            <h4 className="text-xl text-center">Primera alta: {socio.FechaAlta}</h4>

            <div className="flex gap-3">
               <button onClick={() => navigate("/editarsocio/" + socio.IdSocio, { state: { socio }})} className="py-2 px-3 bg-orange-500 text-white mt-5 rounded-xl">
                  <IoPencil className="inline-block mr-2" />
                  Editar datos
               </button>

               {socio.cuotaPagada && (<>
                  <button onClick={() => { navigate("/carnetsocio/" + socio.carnet.IdCarnet) }} className="py-2 px-3 bg-green-500 text-white mt-5 rounded-xl">
                     <IoCard className="inline-block mr-2" />
                     Ver carnet de socio
                  </button>

                  <button onClick={() => { sendSMS() }} className="py-2 px-3 bg-rose-500 text-white mt-5 rounded-xl">
                     { loading && <div className="animate-spin inline-block mr-2">🔄</div> }
                        { !loading && (<>
                           <IoMail className="inline-block mr-2" />
                           {response}
                        </>)}
                  </button>
               </>)}
            </div>

            <div className="mt-[100px] m-5 p-2 bg-slate-50 rounded-lg">
               <h3 className="text-xl text-center">Historial de cuotas</h3>
               {socio.cuotas.length === 0 && <p className="text-center">No hay cuotas</p>}
               {socio.cuotas && socio.cuotas.map((cuota, index) => {
                  return (
                     <div key={index} className="flex justify-between items-center flex-wrap m-2">
                        <p className="inline-block mr-4 text-center">Cuota #{cuota.IdCuota}</p>
                        <p className="inline-block mr-4 text-center">{cuota.FechaPago}</p>
                        <p className="inline-block mr-4 text-center">{cuota.Importe}€</p>
                        <p className="inline-block mr-4 text-center">{cuota.MetodoPago}</p>
                        <button onClick={() => { navigate(`/ticketcuota/${cuota.IdCuota}`, { state: { cuota, socio, socios } }) }} className="text-sm flex items-center bg-blue-400 hover:bg-blue-700 text-white py-2 px-2 rounded"> <IoReceipt className="mr-2" /> Resguardo de cuota</button>
                     </div>
                  )
               })}
            </div>
         </main>
         <Footer />
      </div>
   )
}