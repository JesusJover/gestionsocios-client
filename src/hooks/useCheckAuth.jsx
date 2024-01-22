import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function useCheckAuth() {
  const { isAuthenticated, isLoading } = useAuth0()
  const navigate = useNavigate()

  if (!isLoading && !isAuthenticated) {
    navigate("/login")
  }

  return { isAuthenticated, isLoading }
}