import { useAuth0 } from "@auth0/auth0-react"
// import React, { useRef } from "react"

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0()
   loginWithRedirect()
//   return <button onLoad={() => loginWithRedirect()}>Log In</button>
};

export default LoginButton