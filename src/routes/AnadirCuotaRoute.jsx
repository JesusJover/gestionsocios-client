import Header from "../components/Header";
import { IoPersonAdd, IoCaretBack } from "react-icons/io5"
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import Select from "react-select";

export default function AnadirCuotaRoute() {
   const [loading, setLoading] = useState(false)
   const [response, setResponse] = useState(null)
   const [sociosSelected, setSociosSelected] = useState([])

   const navigate = useNavigate();

   const location = useLocation()
   const socios = location.state.socios

   const sociosOptions = socios.map(socio => {
      return {value: socio.IdSocio, label: `${socio.NombreTitular} ${socio.ApellidosTitular}`}
   })

   useEffect(() => {
      document.title = "Añadir cuota";
   }, []);

   function handleSubmit(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData);
      data.IdSocios = sociosSelected.map(socio => socio.value)
      data.fecha = new Date(data.fecha).toLocaleDateString('es-ES')
      console.log(data)

      setLoading(true)
      fetch("https://gestionasociacion-api.fly.dev/nuevacuota", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((response) => {
         setLoading(false)
         setResponse(response)
      })
   }

   function generateTicket() {
      fetch("https://gestionasociacion-api.fly.dev/socios")
      .then(res => res.json())
      .then(socios => {
         const cuotas = socios.map(socio => { return socio.cuotas })
         console.log("cuotas", cuotas.flat(1))
         const cuota = cuotas.flat(1).find(cuota => parseInt(cuota.IdCuota) === parseInt(response.IdCuota))
         console.log("cuota", cuota)
         navigate(`/ticketcuota/${response.IdCuota}`, { state: { cuota, socios }})
      })
   }

   return (
      <div className="w-screen h-screen p-4 font-mono">
        <Header />
  
        <main className="m-5 mt-[50px] flex flex-col items-center">
         { loading && <Loader /> }

         { !loading && !response && <>
          <h1 className="text-3xl text-center">Añadir nueva cuota</h1>

            <form className="mt-[30px] flex flex-col gap-5 min-w-[400px] max-w-[600px]" method="POST" onSubmit={(e) => handleSubmit(e)}>
                  <div className="flex flex-col gap-2">
                     <label htmlFor="socios">Seleccione los socios: </label>
                     {/* <input type="text" name="nombre" id="nombre" placeholder="Introduce nombre o apellido de los socios" className="p-2" required /> */}
                     <Select
                        isMulti
                        id="socios"
                        required
                        name="socios"
                        placeholder="Introduce nombre o apellido de los socios"
                        options={sociosOptions}
                        noOptionsMessage={() => "No hay socios con ese nombre o apellido"}
                        className="basic-multi-select"
                        onChange={val => setSociosSelected(val)}
                     />
                  </div>
   
                  <div className="flex items-center gap-2">
                     <label htmlFor="importe">Importe: </label>
                     <input type="number" name="importe" id="importe" placeholder="10" className="ml-3 p-2 max-w-[100px]" required/> €
                  </div>
   
                  <div className="flex items-center gap-2">
                     <label htmlFor="fecha">Fecha de pago: </label>
                     <input type="date" name="fecha" id="fecha" defaultValue={new Date().toLocaleDateString('en-CA')} className="ml-3 p-2" required />
                  </div>

                  <div className="flex items-center gap-2">
                     <label htmlFor="metodoPago">Lugar de pago: </label>
                     <select name="metodoPago" id="metodoPago">
                        <option value="Estanco">Estanco</option>
                        <option value="Centro social">Centro Social</option>
                     </select>
                  </div>

                  <div className="flex flex-col gap-2">
                     <label htmlFor="nota">Nota: </label>
                     <textarea name="nota" id="nota" placeholder="Escribir nota..." className="ml-3 p-2 "/>
                  </div>

                  <button type="submit" className="flex justify-center items-center text-xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                     <IoPersonAdd className="inline mr-2" />
                     Registrar cuota
                  </button>
            </form>
         </>}
         { !loading && response && <>
            <h1 className="text-3xl text-center">Cuota añadida correctamente</h1>
            <div className="mt-3 flex flex-col items-center gap-2">
               <p>Socios: {sociosSelected.map(s => s.label).join(", ")}</p>
               <p>IdCouta: {response.IdCuota}</p>
               <p>Importe: {response.Importe}</p>
               <p>Fecha de pago: {response.FechaPago}</p>
               <p>Lugar de pago: {response.MetodoPago}</p>
            </div>
            <button onClick={() => generateTicket()} className="flex justify-center items-center text-xl bg-blue-400 text-white font-bold py-2 px-4 rounded mt-5">
               Generar resguardo
            </button>

            <button onClick={() => navigate("/")} className="flex justify-center items-center text-xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">
               <IoCaretBack className="inline mr-2" />
               Volver al listado
            </button>
         </> }
        </main>
      </div>
    );
}