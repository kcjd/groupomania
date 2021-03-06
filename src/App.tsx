import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import AppLayout from './components/AppLayout'
import AuthLayout from './components/AuthLayout'
import Preferences from './components/Preferences'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import Users from './pages/Users'
import { getPosts } from './store/features/postsSlice'
import { getUsers } from './store/features/usersSlice'
import { useAppDispatch, useAppSelector } from './store/hooks'

const App = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (user) {
      Promise.all([dispatch(getUsers()), dispatch(getPosts())])
    }
  }, [user])

  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />

            <Route path="users">
              <Route index element={<Users />} />
              <Route path=":userId" element={<Profile />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>

      <Preferences />
    </>
  )
}

export default App
