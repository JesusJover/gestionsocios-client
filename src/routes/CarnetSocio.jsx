import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Loader from "../components/Loader"

export default function CarnetSocio() {
   const { IdCarnet } = useParams()

   const [loading, setLoading] = useState(true)
   const [socio, setSocio] = useState(null)

   useEffect(() => {
      document.title = "Carnet de socio"

      if (IdCarnet){
         fetch(`https://gestionasociacion-api.fly.dev/carnet/${IdCarnet}`)
         .then(res => {
            if (res.status === 404) {
               return Promise.resolve(false)
            } else {
               return res.json()
            }
         })
         .then(socio => {
            if (!socio) setSocio(false)
            setSocio(socio)
            setLoading(false)
         })
      }
   }, [IdCarnet])

   console.log(socio)

   if (loading) return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
         <img className="mb-[50px] max-w-[200px]" src="https://vecinosdesierra.com/wp-content/uploads/2018/04/cropped-Logotipo-Asociacion-de-Vecinos-de-Sierra-Asociacion-de-Vecinos-de-Sierra-vecinosdesierra-2.png" alt="logo" />
         <Loader />
      </div>
   )

   if (socio === false) return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
         <img className="mb-[50px] max-w-[200px]" src="https://vecinosdesierra.com/wp-content/uploads/2018/04/cropped-Logotipo-Asociacion-de-Vecinos-de-Sierra-Asociacion-de-Vecinos-de-Sierra-vecinosdesierra-2.png" alt="logo" />
         <p className="text-center">No se ha encontrado ningún socio con ese carnet</p>
      </div>
   )
   
   return (
      <div className="w-screen justify-center">
         <div className="drop-shadow flex flex-col justify-end p-4 rounded-3xl mx-auto my-5 w-[90%] aspect-[16/10] fondo-carnet-socio max-w-[600px]">
         <img className="absolute -rotate-90 top-[45%] right-[-12%] w-[40%] invert" src="https://vecinosdesierra.com/wp-content/uploads/2018/04/cropped-Logotipo-Asociacion-de-Vecinos-de-Sierra-Asociacion-de-Vecinos-de-Sierra-vecinosdesierra-2.png" alt="logo" />
            <p className="text-white text-xl font-bold font-mono">{socio.NombreTitular} {socio.ApellidosTitular}</p>
            <div className="flex flex-row justify-between items-center">
               <p className="text-slate-300 text-md font-bold font-mono">Socio #{socio.IdSocio}, desde el {socio.FechaAlta}</p>
            </div>
         </div>

         <div className="mt-[50px] mx-auto w-[90%] max-w-[600px]">
            <h1 className="font-mono text-lg font-bold">Tus pagos de las cuotas de socio</h1>
            <div className="w-full bg-slate-100 drop-shadow rounded-3xl mt-2 p-3 flex flex-col-reverse gap-3">
               { socio?.cuotas?.map(cuota => {
                  return (
                     <div key={cuota.IdCouta} className="font-mono text-md items-center flex gap-3">
                        <p className="drop-shadow inline-block font-bold py-2 px-3 bg-green-600 rounded-xl text-white">{cuota.FechaPago.split("/")[2]}</p>
                        <p className="font-mono">Pagaste tu cuota el {cuota.FechaPago}</p>
                     </div>
                  )
               })}

               { !socio?.cuotaPagada && (
                     <div className="font-mono text-md items-center flex gap-3">
                        <p className="drop-shadow inline-block font-bold py-2 px-3 bg-yellow-600 rounded-xl text-white">{new Date().getFullYear()}</p>
                        <p className="font-mono">Aún no has pagado la cuota de {new Date().getFullYear()}</p>
                     </div>
                  )
               }
            </div>
         </div>

         <div className="mt-[50px] mx-auto w-[90%] font-mono text-sm max-w-[600px]">
           <p className="text-center mb-3">¡Gracias por colaborar con la Asociación de Vecinos de Sierra!</p>
           <p className="text-center">Tu aportación economica hace que esta asociación trabaje por y para la aldea, la mantenga viva y luche por su mejora.</p>
         </div>
      </div>
   )
}