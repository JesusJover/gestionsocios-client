import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"

export default function Footer (){
   const { user, isAuthenticated, isLoading, logout } = useAuth0()
   const navigate = useNavigate()

      if (isLoading) return (<div>Loading...</div>)
      return (
         <footer className="m-5 flex justify-center items-center text-slate-500">
               { isAuthenticated && (
                  <p className="inline-block text-center cursor-pointer" onClick={() => {logout({ logoutParams: { returnTo: window.location.origin + "/socios" } })}}>Sesión iniciada con {user.email} <br/> Cerrar sesión</p>
               )}
               { !isAuthenticated && (
                  <p className="inline-block" onClick={() => {navigate("/login")}}>Iniciar sesión</p>
               )}
         </footer>
      )
}