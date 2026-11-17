import { Navigate } from 'react-router-dom'
import { useGlobalContext } from '../context/appContext'

const PrivateRoute = ({ children }) => {
  const { user } = useGlobalContext()
  return user ? children : <Navigate to='/' replace />
}

export default PrivateRoute
