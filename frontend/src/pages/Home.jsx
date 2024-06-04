import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react"


const Home = () => {
  const navigate = useNavigate()
  const {user} = useAuth()

  useEffect(() => {
      if (user) {
          navigate('/dashboard')
      }
  })

  return (
    <div>Home</div>
  )
}

export default Home