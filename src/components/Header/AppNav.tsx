import { Container, HStack } from '@chakra-ui/react'

import { selectAuthUser } from '../../store/features/authSlice'
import { useAppSelector } from '../../store/hooks'
import AppNavLink from './AppNavLink'

const AppNav = () => {
  const authUser = useAppSelector(selectAuthUser)

  return (
    <HStack bg="white">
      <Container maxW="8xl">
        <HStack as="nav" spacing={12} justify="center">
          <AppNavLink to="/">Accueil</AppNavLink>

          <AppNavLink to="/users">Utilisateurs</AppNavLink>

          <AppNavLink to={`/profile/${authUser?.id}`}>Mon profil</AppNavLink>
        </HStack>
      </Container>
    </HStack>
  )
}

export default AppNav
