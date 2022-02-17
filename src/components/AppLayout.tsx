import { Outlet } from 'react-router-dom'

import { Container, Grid } from '@chakra-ui/react'

import Header from './Header/Header'

const AppLayout = () => {
  return (
    <Grid templateRows="auto 1fr" minH="100vh">
      <Header />

      <Container as="main" maxW="container.md" py={8}>
        <Outlet />
      </Container>
    </Grid>
  )
}

export default AppLayout
