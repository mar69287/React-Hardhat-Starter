import { Routes, Route } from 'react-router-dom'
import PrivateRoutes from './utilities/PrivateRoutes'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
        <AuthProvider>
              <Routes>
                <Route element={<PrivateRoutes />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route path='/' element={<Home />} />
              </Routes>
          </AuthProvider>
  )
}

export default App
