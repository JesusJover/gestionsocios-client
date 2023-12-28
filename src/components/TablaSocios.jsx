import FilaSocio from "./FilaSocio"
import { useState, useEffect } from "react"
import Loader from "./Loader"

export default function TablaSocios ({
   socios,
   loading = false,
   onEliminar = () => {},
   onEditar = () => {}
}) {
   const [sociosFiltered, setSociosFiltered] = useState([])
   useEffect(() => {
      setSociosFiltered(socios)
   }, [socios])
   
   function filtrar (e) {
      const texto = e.target.value.toLowerCase()
      const sociosFiltrados = socios.filter(socio => {
         const nombreCompleto = `${socio.NombreTitular} ${socio.ApellidosTitular}`
         return nombreCompleto.toLowerCase().includes(texto)
      })
      setSociosFiltered(sociosFiltrados)
   }

   if (loading) {
      return (<Loader />)
   }

   return (
      <div className="flex flex-col items-center bg-slate-50 rounded my-5 p-2">

         <div className="m-2 flex justify-center items-center flex-wrap gap-3">
            <div className="inline-block text-right">
               <p className="mx-3 font-bold">Número de socios: {socios.length}</p>
               <p className="mx-3 font-bold">Con cuota pagada: {socios.filter(socio => socio.cuotaPagada).length}</p>
            </div>
            <input className="border border-gray-200 p-2 rounded-lg" onChange={filtrar} type="text" placeholder="Buscar socios"/>
         </div>

         {sociosFiltered.map(socio => <FilaSocio key={socio.IdSocio} socio={socio} socios={socios} onEliminar={onEliminar} onEditar={onEditar} />)}
      </div>
   )
}