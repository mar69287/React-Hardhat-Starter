import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react"
import LoginButton from "../components/buttons/LoginButton"


const Home = () => {
  const navigate = useNavigate()
  const { client } = useAuth()

  useEffect(() => {
      if (client) {
          navigate('/dashboard')
      }
  })

  return (
    <div className="page justify-center items-center">
       <LoginButton />
    </div>
  )
}

export default Home