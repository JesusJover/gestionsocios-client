import Header from "../components/Header";
import { IoPersonAdd, IoCaretBack } from "react-icons/io5"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export default function AnadirSocioRoute() {
   const [loading, setLoading] = useState(false)
   const [response, setResponse] = useState(null)
   const navigate = useNavigate();

   useEffect(() => {
      document.title = "Añadir socio";
   }, []);

   function handleSubmit(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData);
      
      setLoading(true)
      fetch("https://gestionasociacion-api.fly.dev/nuevosocio", {
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
         console.log(response)
      })
   }

   return (
      <div className="w-screen h-screen p-4 font-mono">
        <Header />
  
        <main className="m-5 mt-[50px] flex flex-col items-center">
         { loading && <Loader /> }

         { !loading && !response && <>
          <h1 className="text-3xl text-center">Añadir nuevo soci@</h1>

            <form className="mt-[30px] flex flex-col gap-5" method="POST" onSubmit={(e) => handleSubmit(e)}>
                  <div className="flex items-center gap-2">
                     <label htmlFor="nombre">Nombre</label>
                     <input type="text" name="nombre" id="nombre" placeholder="Introduce nombre" className="ml-3 p-2" required />
                  </div>
   
                  <div className="flex items-center gap-2">
                     <label htmlFor="apellidos">Apellidos</label>
                     <input type="text" name="apellidos" id="apellidos" placeholder="Introduce apellidos" className="ml-3 p-2"/>
                  </div>
   
                  <div className="flex items-center gap-2">
                     <label htmlFor="telefono">Teléfono</label>
                     <input type="tel" name="telefono" id="telefono"  pattern="[0-9]{0,9}" placeholder="Introduce teléfono" className="ml-3 p-2" />
                  </div>

                  <button type="submit" className="flex justify-center items-center text-xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                     <IoPersonAdd className="inline mr-2" />
                     Añadir socio
                  </button>
            </form>
         </>}
         { !loading && response && <>
            <h1 className="text-3xl text-center">Socio añadido correctamente</h1>
            <div className="mt-3 flex flex-col items-center gap-2">
               <p>IdSocio: {response.IdSocio}</p>
               <p>Nombre: {response.NombreTitular}</p>
               <p>Apellidos: {response.ApellidosTitular}</p>
               <p>Teléfono: {response.Telefono ? response.Telefono : "(no introducido)"}</p>
            </div>
            <button onClick={() => navigate("/")} className="flex justify-center items-center text-xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">
               <IoCaretBack className="inline mr-2" />
               Volver al listado
            </button>
         </> }
        </main>
      </div>
    );
}