import { Route, Routes } from 'react-router-dom'

import AuthLayout from './components/AuthLayout'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'
import Profile from './pages/Profile/Profile'
import Users from './pages/Users/Users'

const App = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="users" element={<Users />} />
        <Route path="profile/:userId" element={<Profile />} />
      </Route>

      <Route path="*" element={<NotFound />} />

      <Route element={<AuthLayout />}>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  )
}

export default App
