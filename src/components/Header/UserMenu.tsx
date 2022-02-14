import { HiAdjustments, HiLogout } from 'react-icons/hi'

import { Avatar, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logout, selectAuthUser } from '../../features/authSlice'

const UserMenu = () => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)

  const onLogout = () => dispatch(logout())

  return (
    <Menu placement="bottom-end">
      <MenuButton as={IconButton} variant="unstyled" aria-label="Menu" isRound>
        <Avatar name="" src={authUser?.picture} />
      </MenuButton>

      <MenuList>
        <MenuItem icon={<Icon as={HiAdjustments} boxSize={4} color="gray.500" />}>Préférences</MenuItem>

        <MenuItem onClick={onLogout} icon={<Icon as={HiLogout} boxSize={4} color="gray.500" />}>
          Déconnexion
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
export default UserMenu
