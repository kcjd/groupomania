import { HiBell } from 'react-icons/hi'
import { Link as RouterLink } from 'react-router-dom'

import { Container, HStack, Icon, IconButton, Image, Link, VStack } from '@chakra-ui/react'

import logo from '../../assets/images/logo.svg'
import AppNav from './AppNav'
import UserMenu from './UserMenu'

const Header = () => {
  return (
    <VStack as="header" spacing={0} align="stretch" position="sticky" top={0} zIndex="banner">
      <HStack h={16} bg="gray.900">
        <Container maxW="container.xl">
          <HStack justify="space-between">
            <Link as={RouterLink} to="/">
              <Image src={logo} alt="Groupomania" h={6} />
            </Link>

            <HStack>
              <IconButton
                variant="blank"
                color="white"
                icon={<Icon as={HiBell} boxSize={5} />}
                aria-label="Notifications"
                isRound
              />

              <UserMenu />
            </HStack>
          </HStack>
        </Container>
      </HStack>

      <AppNav />
    </VStack>
  )
}

export default Header
