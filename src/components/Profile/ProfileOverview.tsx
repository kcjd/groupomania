import {
    HiBadgeCheck, HiDotsHorizontal, HiPencilAlt, HiUserAdd, HiUserRemove, HiX
} from 'react-icons/hi'

import {
    Avatar, Box, Button, HStack, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Text,
    VStack
} from '@chakra-ui/react'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectAuthUser } from '../../features/authSlice'
import { addFollow, deleteFollow, selectFollow } from '../../features/followsSlice'
import { UserData } from '../../types/types'
import Card from '../UI/Card'

interface Props {
  user: UserData
}

const ProfileOverview = ({ user }: Props) => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)

  const isOwner = authUser?.id === user.id
  const isModerator = authUser?.role === 'moderator'

  const userFollow = useAppSelector((state) => selectFollow(state, authUser?.id, user.id))

  const onFollow = () => {
    if (!authUser) return
    dispatch(addFollow({ userId: authUser.id, following: user.id }))
  }

  const onUnfollow = () => {
    if (!authUser || !userFollow) return
    dispatch(deleteFollow(userFollow.id))
  }

  return (
    <Card position="relative" d="flex" flexDir="column" alignItems="center" gap={4} overflow="hidden">
      <Box position="absolute" inset={0} h={24} bg="brand.400" />

      {!isOwner && isModerator && (
        <Menu placement="bottom-end">
          <MenuButton
            as={IconButton}
            position="absolute"
            top={4}
            right={4}
            size="sm"
            icon={<Icon as={HiDotsHorizontal} boxSize={4} />}
            aria-label="Options de modération"
            isRound
          />

          <MenuList>
            <MenuItem icon={<Icon as={HiBadgeCheck} boxSize={4} color="gray.500" />}>Définir comme modérateur</MenuItem>

            <MenuItem icon={<Icon as={HiX} boxSize={4} color="gray.500" />}>Supprimer l'utilisateur</MenuItem>
          </MenuList>
        </Menu>
      )}

      <Box position="relative" mt={7} p={1} bg="white" borderRadius="full">
        <Avatar name="" src={user.picture} size="xl" />
      </Box>

      <VStack spacing={0}>
        <Text fontWeight="semibold">
          {user.firstname} {user.lastname}
        </Text>

        <Text color="gray.500" fontSize="sm">
          {user.position}
        </Text>
      </VStack>

      <HStack>
        {isOwner ? (
          <Button colorScheme="brand" leftIcon={<Icon as={HiPencilAlt} />}>
            Modifier mon profil
          </Button>
        ) : (
          <Button
            colorScheme={userFollow ? undefined : 'brand'}
            leftIcon={userFollow ? <Icon as={HiUserRemove} boxSize={5} /> : <Icon as={HiUserAdd} boxSize={5} />}
            onClick={userFollow ? onUnfollow : onFollow}
          >
            {userFollow ? 'Me désabonner' : "M'abonner"}
          </Button>
        )}
      </HStack>
    </Card>
  )
}

export default ProfileOverview
