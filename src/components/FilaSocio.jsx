import { useNavigate } from "react-router-dom"

export default function FilaSocio ({
   socio,
   socios
}) {
   const navigate = useNavigate()
   let ultimaCuotaPagada, fechaCaducidad, diasRestantes

   if (socio.cuotas.length !== 0) {
      // Del array socios.cuotas obten la última cuota pagada (cuya FechaPago sea la más reciente)
      ultimaCuotaPagada = socio.cuotas.reduce((cuotaMasReciente, cuota) => {
         // Las fechas están en formato DD/MM/YYYY
         const fechaMasReciente = cuotaMasReciente.FechaPago.split("/").reverse().join("-")
         const fecha = cuota.FechaPago.split("/").reverse().join("-")
         if (fecha > fechaMasReciente) {
            return cuota
         }
         return cuotaMasReciente
      })

      // La fecha de caducidad es la fecha de la última cuota pagada + 1 año
      fechaCaducidad = new Date(ultimaCuotaPagada.FechaPago.split("/").reverse().join("-"))
      fechaCaducidad.setFullYear(fechaCaducidad.getFullYear() + 1)
      fechaCaducidad.toLocaleString()

      // Calcula los días restantes hasta la fecha de caducidad
      const hoy = new Date()
      const milisegundosRestantes = fechaCaducidad - hoy
      diasRestantes = Math.floor(milisegundosRestantes / (1000 * 60 * 60 * 24))
   
      socio.ultimaCuotaPagada = ultimaCuotaPagada
      socio.fechaCaducidad = fechaCaducidad
      socio.diasRestantes = diasRestantes
   }

   return (<>
      <div className="m-3 hover:font-bold cursor-pointer" onClick={() => {navigate(`/socio/${socio.IdSocio}`, { state: { socio, socios }})}}>
         <p className="inline-block mr-3">[#{socio.IdSocio}] {socio.NombreTitular.toUpperCase()} {socio.ApellidosTitular.toUpperCase()}</p>
         { socio.cuotaPagada && diasRestantes > 30 &&
            <div className="inline-block py-1 px-2 bg-green-200 rounded-lg">
               Cuota pagada
            </div>
         }
         { socio.cuotaPagada && diasRestantes <= 30 &&
            <div className="inline-block py-1 px-2 bg-amber-200 rounded-lg">
               Caduca próximamente, el {fechaCaducidad.toLocaleDateString()}
            </div>
         }
         { !socio.cuotaPagada &&
            <div className="inline-block py-1 px-2 bg-red-200 rounded-lg">
               { ultimaCuotaPagada && `Cuota caducada el ${fechaCaducidad.toLocaleDateString()}` }
               { !ultimaCuotaPagada && `Sin cuotas` }
            </div>
         }
      </div>
      <hr />
   </>)
}