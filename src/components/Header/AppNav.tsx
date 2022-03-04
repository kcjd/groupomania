import { Container, HStack } from '@chakra-ui/react'

import { useAppSelector } from '../../store/hooks'
import AppNavLink from './AppNavLink'

const AppNav = () => {
  const { user } = useAppSelector((state) => state.auth)

  return (
    <HStack bg="white">
      <Container maxW="8xl">
        <HStack as="nav" spacing={12} justify="center">
          <AppNavLink to="/">Accueil</AppNavLink>

          <AppNavLink to="/users">Utilisateurs</AppNavLink>

          <AppNavLink to={`/users/${user}`}>Profil</AppNavLink>
        </HStack>
      </Container>
    </HStack>
  )
}

export default AppNav
