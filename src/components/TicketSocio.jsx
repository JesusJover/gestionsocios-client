import './TicketSocio.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { IoPrint, IoCaretBack } from "react-icons/io5";

export default function TicketSocio() {
   const navigate = useNavigate()
   const location = useLocation()
   const cuota = location.state.cuota
   // const socio = location.state.socio
   const socios = location.state.socios
   const caducidad = new Date(cuota.FechaPago.split("/").reverse().join("-"))
   const anoPago = caducidad.getFullYear()
   const IdSocios = cuota.IdSocios.split(",")
   const sociosCuota = socios.filter(socio => IdSocios.includes(socio.IdSocio.toString()))

   caducidad.setFullYear(caducidad.getFullYear() + 1)
   return (<>
      <div className="ticket font-mono flex flex-col items-center">
         <h3 className='text-xl'>Cuota #{cuota.IdCuota}</h3>
         <div className='my-3 flex flex-col items-center'>
            { sociosCuota.map((socio, index) => {
               return <h2 className='text-2xl font-bold text-center' key={index}>{socio.NombreTitular.toUpperCase()} {socio.ApellidosTitular.toUpperCase()}</h2>
            })}
         </div>
         <h3 className='text-lg font-bold mt-1 mb-2'>PAGO CUOTA {anoPago}</h3>
         <h3 className='mt-1'>Fecha pago: {cuota.FechaPago}</h3>
         <h3 className='mt-1'>Importe pagado: {cuota.Importe}€</h3>

         {/* <h3 className=''>Caducidad: {caducidad.toLocaleDateString()}</h3> */}
         
         { cuota.Nota && <h3 className='font-bold m-1'>Nota: {cuota.Nota}</h3> }
         <p className='mt-4 text-center italic'>¡Gracias por colaborar con la Asociación de Vecinos de Sierra!</p>
         <img className="w-3/4 mx-auto mt-4" src="https://vecinosdesierra.com/wp-content/uploads/2018/04/cropped-Logotipo-Asociacion-de-Vecinos-de-Sierra-Asociacion-de-Vecinos-de-Sierra-vecinosdesierra-2.png" alt="logo" />
      </div>

      <div className="no-print flex justify-center mt-[50px]">
         <button className="flex items-center text-xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {window.print()}}> <IoPrint className='mr-3' /> Imprimir resguardo</button>
      </div>

      <div className="no-print flex justify-center mt-[50px]">
         <button className="flex items-center text-xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {navigate("/")}}> <IoCaretBack className='mr-3' /> Volver al listado</button>
      </div>
   </>)
}