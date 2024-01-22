import { IoReceipt, IoPersonAdd } from "react-icons/io5"
import TablaSocios from "../components/TablaSocios"
import Header from "../components/Header"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useCheckAuth from "../hooks/useCheckAuth"
import { useAuth0 } from "@auth0/auth0-react";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

export default function IndexRoute() {
  const { isAuthenticated, isLoading } = useCheckAuth()
  const { getAccessTokenSilently } = useAuth0()

  const navigate = useNavigate()
  const [socios, setSocios] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true)
      getAccessTokenSilently()
      .then(token =>{
        return fetch("https://gestionasociacion-api.fly.dev/socios",
        // return fetch("http://localhost:3000/socios",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          })
      })
      .then(res => res.json())
      .then(socios => {
          setSocios(socios)
          setLoading(false)
      })
    }
  }, [isAuthenticated])

  if (isLoading) return (
    <div className="w-screen h-screen flex justify-center items-center">
       <Loader />
    </div>
  )
  
  if (!isLoading && !isAuthenticated) {
    navigate("/login")
  }

   return (
      <div className="w-screen h-screen p-4 font-mono">
        <Header />
  
        <main className="mt-[50px] mx-auto">
          { !loading && (
            <div className="flex flex-wrap justify-center gap-5">
              <button onClick={() => navigate("/nuevosocio")} className="flex items-center text-xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <IoPersonAdd className="inline mr-2" /> Añadir socio
              </button>
    
              <button onClick={() => navigate("/nuevacuota", { state: { socios }})} className="flex items-center text-xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <IoReceipt className="inline mr-2" /> Pago de cuota
              </button>
            </div>
          )}
  
          {/* Listado de socios */}
          <div className="mt-[30px] flex flex-col items-center ">
            <TablaSocios socios={socios} loading={loading} />
          </div>
        </main>

        <Footer />
      </div>
    );
}