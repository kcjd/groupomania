import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector } from '../app/hooks'

const PrivateRoute = () => {
  const { user } = useAppSelector((state) => state.auth)

  if (!user) return <Navigate to="/login" replace />

  return <Outlet />
}

export default PrivateRoute
