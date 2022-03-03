import { HiAdjustments, HiLogout } from 'react-icons/hi'

import { Icon, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'

import { logout, selectAuthUser } from '../../store/features/authSlice'
import { openPreferences } from '../../store/features/modalsSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import Avatar from '../User/Avatar'

const UserMenu = () => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)

  const onOpenPreferences = () => dispatch(openPreferences())
  const onLogout = () => dispatch(logout())

  return (
    <Menu placement="bottom-end">
      <MenuButton as={IconButton} variant="unstyled" aria-label="Menu" isRound>
        <Avatar user={authUser} />
      </MenuButton>

      <MenuList>
        <MenuItem icon={<Icon as={HiAdjustments} boxSize={4} color="gray.500" />} onClick={onOpenPreferences}>
          Préférences
        </MenuItem>

        <MenuItem icon={<Icon as={HiLogout} boxSize={4} color="gray.500" />} onClick={onLogout}>
          Déconnexion
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
export default UserMenu
