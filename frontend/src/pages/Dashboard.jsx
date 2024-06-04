import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const { client, sample  } = useAuth();

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard