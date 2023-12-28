import Header from "../components/Header"
import { useNavigate, useLocation } from "react-router-dom"
import { IoReceipt } from "react-icons/io5"

export default function SocioRoute () {
   const navigate = useNavigate()

   const location = useLocation()
   const socio = location.state.socio
   const socios = location.state.socios
   
   return (
      <div className="w-screen h-screen p-4">
        <Header />
  
        <main className="mt-[100px] flex flex-col items-center font-mono">
          <h2 className="text-2xl text-center">Socio #{socio.IdSocio} {socio.NombreTitular.toUpperCase()} {socio.ApellidosTitular.toUpperCase()}</h2>
          
         { socio.cuotaPagada && socio.diasRestantes > 30 &&
            <div className="text-center text-lg inline-block mt-3 py-1 px-2 bg-green-200 rounded-lg">
               Cuota pagada
            </div>
         }

         { socio.cuotaPagada && socio.diasRestantes <= 30 &&
            <div className="text-center text-lg inline-block mt-3 py-1 px-2 bg-amber-200 rounded-lg">
               Caduca próximamente, el {socio.fechaCaducidad.toLocaleDateString()}
            </div>
         }

         { !socio.cuotaPagada &&
            <div className="text-center text-lg inline-block mt-3 py-1 px-2 bg-red-200 rounded-lg">
               { socio.ultimaCuotaPagada && `Cuota caducada el ${socio.fechaCaducidad.toLocaleDateString()}` }
               { !socio.ultimaCuotaPagada && `Sin cuotas` }
            </div>
         }

          <h4 className="mt-3 text-xl text-center">Teléfono: {socio.Telefono}</h4>
          <h4 className="text-xl text-center">Primera alta: {socio.FechaAlta}</h4>

         
         <div className="mt-[100px] m-5 p-2 bg-slate-50 rounded-lg">
            <h3 className="text-xl text-center">Historial de cuotas</h3>
            { socio.cuotas.length === 0 && <p className="text-center">No hay cuotas</p>}
            { socio.cuotas && socio.cuotas.map((cuota, index) => {
               return (
                  <div key={index} className="flex justify-between items-center flex-wrap m-2">
                     <p className="inline-block mr-4 text-center">Cuota #{cuota.IdCuota}</p>
                     <p className="inline-block mr-4 text-center">{cuota.FechaPago}</p>
                     <p className="inline-block mr-4 text-center">{cuota.Importe}€</p>
                     <p className="inline-block mr-4 text-center">{cuota.MetodoPago}</p>
                     <button onClick={() => {navigate(`/ticketcuota/${cuota.IdCuota}`, { state: {cuota, socio, socios} })}} className="text-sm flex items-center bg-blue-400 hover:bg-blue-700 text-white py-2 px-2 rounded"> <IoReceipt className="mr-2"/> Resguardo de cuota</button>
                  </div>
               )
            }) }
         </div>
        </main>
      </div>
   )
}