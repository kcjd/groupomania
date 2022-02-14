import { Outlet } from 'react-router-dom'

import { Container } from '@chakra-ui/react'

import Header from './Header/Header'

const AppLayout = () => {
  return (
    <>
      <Header />

      <Container as="main" maxW="container.md" py={8}>
        <Outlet />
      </Container>
    </>
  )
}

export default AppLayout
