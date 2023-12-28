import { IoReceipt, IoPersonAdd } from "react-icons/io5"
import TablaSocios from "../components/TablaSocios"
import Header from "../components/Header"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function IndexRoute() {
  const navigate = useNavigate()

  const [socios, setSocios] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch("https://gestionasociacion-api.fly.dev/socios")
    .then(res => res.json())
    .then(socios => {
        setSocios(socios)
        setLoading(false)
    })
  }, [])

   return (
      <div className="w-screen h-screen p-4 font-mono">
        <Header />
  
        <main className="mt-[50px] mx-auto">
          <div className="flex flex-wrap justify-center gap-5">
            <button onClick={() => navigate("/nuevosocio")} className="flex items-center text-xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <IoPersonAdd className="inline mr-2" /> Añadir socio
            </button>
  
            <button onClick={() => navigate("/nuevacuota", { state: { socios }})} className="flex items-center text-xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <IoReceipt className="inline mr-2" /> Pago de cuota
            </button>
          </div>
  
          {/* Listado de socios */}
          <div className="mt-[30px] flex flex-col items-center ">
            <TablaSocios socios={socios} loading={loading} />
          </div>
        </main>
      </div>
    );
}