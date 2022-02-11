import { Outlet } from 'react-router-dom'

import { Container, GridItem, Image, SimpleGrid } from '@chakra-ui/react'

import building from '../assets/images/building.webp'

const AuthLayout = () => {
  return (
    <SimpleGrid as="main" columns={2} minH="100vh">
      <GridItem colSpan={{ base: 2, lg: 1 }} bg="white">
        <Container maxW="lg" py={24}>
          <Outlet />
        </Container>
      </GridItem>

      <GridItem d={{ base: 'none', lg: 'block' }} position="relative">
        <Image src={building} alt="" position="absolute" inset={0} w="full" h="full" objectFit="cover" />
      </GridItem>
    </SimpleGrid>
  )
}

export default AuthLayout
