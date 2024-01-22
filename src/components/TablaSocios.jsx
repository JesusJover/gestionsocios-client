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

   // Obtenemos array de cuotas pagadas
   const cuotasPagadas = socios.reduce((cuotasPagadas, socio) => {
         socio.cuotas.forEach(cuota => {
            cuotasPagadas.push(cuota)
         })
      return cuotasPagadas
   }, [])

   // Eliminar cuotas duplicadas
   const cuotasPagadasUnicas = cuotasPagadas.filter((cuota, index, self) =>
      index === self.findIndex((c) => (
         c.IdCuota === cuota.IdCuota
      ))
   ) 

   // Obtener los años que al menos tienen una cuota pagada
   const anos = socios.reduce((anos, socio) => {
      if (socio.cuotas.length !== 0) {
         socio.cuotas.forEach(cuota => {
            const ano = cuota.FechaPago.split("/")[2]
            if (!anos.includes(ano)) {
               anos.push(ano)
            }
         })
      }
      return anos
   }, [])
   anos.sort((a, b) => b + a)

   // Resumen de numero de cuotas pagadas por años
   const resumenCuotas = anos.map(ano => {
      const cuotas = cuotasPagadasUnicas.filter(cuota => cuota.FechaPago.split("/")[2] === ano)
      // Obtenemos array de IdSocios de las cuotas
      const IdSocios = cuotas.reduce((IdSocios, cuota) => {
         cuota.IdSocios.split(",").forEach(IdSocio => {
            IdSocios.push(IdSocio)
         })
         return IdSocios
      }, [])

      // Eliminar IdSocios duplicados
      const IdSociosUnicos = IdSocios.filter((IdSocio, index, self) =>
         index === self.findIndex((s) => (
            s === IdSocio
         ))
      )

      return { ano, cuotas, IdSociosUnicos }
   })

   if (loading) {
      return (<Loader />)
   }

   return (
      <div className="flex flex-col md:items-center bg-slate-50 rounded my-5 p-2">

         <div className="m-2 flex justify-center items-center flex-wrap gap-3">
            <div className="inline-block text-right">
               <p className="mx-3 font-bold">Listado de socios: <span className="inline-block w-[35px]">{socios.length}</span></p>
               { resumenCuotas.map((resumen, index) => {
                  return <p key={index} className="mx-3 font-bold">Pagados en {resumen.ano}: <span className="inline-block w-[35px]">{resumen.IdSociosUnicos.length}</span></p>
               }
               )}
               {/* <p className="mx-3 font-bold">Con cuota pagada: {socios.filter(socio => socio.cuotaPagada).length}</p> */}
            </div>
            <input className="border border-gray-200 p-2 rounded-lg" onChange={filtrar} type="text" placeholder="Buscar socios"/>
         </div>

         {sociosFiltered.map(socio => <FilaSocio key={socio.IdSocio} socio={socio} socios={socios} onEliminar={onEliminar} onEditar={onEditar} />)}
      </div>
   )
}