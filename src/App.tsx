import { Route, Routes } from 'react-router-dom'

import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'
import Profile from './pages/Profile/Profile'
import Users from './pages/Users/Users'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="users" element={<Users />} />
      <Route path="profile/:userId" element={<Profile />} />

      <Route path="*" element={<NotFound />} />

      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
    </Routes>
  )
}

export default App
