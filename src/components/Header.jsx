import { useNavigate } from "react-router-dom"

export default function Header() {
   const navigate = useNavigate()
   return (
      <header onClick={() => {navigate("/")}}>
          <img className="w-1/4 h-1/4 mx-auto max-w-[300px] min-w-[150px]" src="https://vecinosdesierra.com/wp-content/uploads/2018/04/cropped-Logotipo-Asociacion-de-Vecinos-de-Sierra-Asociacion-de-Vecinos-de-Sierra-vecinosdesierra-2.png" alt="logo" />
      </header>
   )
}