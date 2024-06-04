import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const PrivateRoutes = () => {
    const { client } = useAuth()
    return client ? <Outlet/> : <Navigate to='/'/>
}

export default PrivateRoutes