import { Outlet } from 'react-router-dom'

import { Container, Grid } from '@chakra-ui/react'

import Header from './Header'

const AppLayout = () => {
  return (
    <Grid templateRows="auto 1fr " minH="100vh">
      <Header />

      <Container as="main" minW={0} maxW="container.md" pt={8} pb={20}>
        <Outlet />
      </Container>
    </Grid>
  )
}

export default AppLayout
