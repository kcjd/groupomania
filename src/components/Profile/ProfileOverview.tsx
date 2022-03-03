import { HiPencilAlt, HiUserAdd, HiUserRemove } from 'react-icons/hi'

import { Box, Button, HStack, Icon } from '@chakra-ui/react'

import { selectAuthUser } from '../../store/features/authSlice'
import { addFollow, deleteFollow, selectFollow } from '../../store/features/followsSlice'
import { openPreferences } from '../../store/features/modalsSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { UserData } from '../../types/types'
import Card from '../UI/Card'
import Avatar from '../User/Avatar'
import User from '../User/User'

interface Props {
  user: UserData
}

const ProfileOverview = ({ user }: Props) => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)

  const isOwner = authUser?.id === user.id

  const userFollow = useAppSelector((state) => selectFollow(state, authUser?.id, user.id))

  const onFollow = () => dispatch(addFollow(user.id))
  const onUnfollow = () => dispatch(deleteFollow(user.id))

  const onOpenPreferences = () => dispatch(openPreferences())

  return (
    <Card position="relative" d="flex" flexDir="column" alignItems="center" gap={4} overflow="hidden">
      <Box position="absolute" inset={0} h={24} bg="brand.400" />

      <Box position="relative" mt={7} p={1} bg="white" borderRadius="full">
        <Avatar user={user} size="xl" />
      </Box>

      <User user={user} />

      <HStack>
        {isOwner ? (
          <Button colorScheme="brand" leftIcon={<Icon as={HiPencilAlt} />} onClick={onOpenPreferences}>
            Modifier mon profil
          </Button>
        ) : (
          <Button
            colorScheme={userFollow ? undefined : 'brand'}
            leftIcon={userFollow ? <Icon as={HiUserRemove} boxSize={5} /> : <Icon as={HiUserAdd} boxSize={5} />}
            onClick={userFollow ? onUnfollow : onFollow}
          >
            {userFollow ? 'Se désabonner' : "S'abonner"}
          </Button>
        )}
      </HStack>
    </Card>
  )
}

export default ProfileOverview
