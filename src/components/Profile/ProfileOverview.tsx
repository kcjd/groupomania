import { HiPencilAlt, HiUserAdd, HiUserRemove } from 'react-icons/hi'

import { Avatar, Box, Button, HStack, Icon, Text, VStack } from '@chakra-ui/react'

import { baseURL } from '../../api/api'
import { selectAuthUser } from '../../store/features/authSlice'
import { addFollow, deleteFollow, selectFollow } from '../../store/features/followsSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { UserData } from '../../types/types'
import Card from '../UI/Card'

interface Props {
  user: UserData
}

const ProfileOverview = ({ user }: Props) => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)

  const isOwner = authUser?.id === user.id

  const userFollow = useAppSelector((state) => selectFollow(state, authUser?.id, user.id))

  const onFollow = () => {
    dispatch(addFollow(user.id))
  }

  const onUnfollow = () => {
    dispatch(deleteFollow(user.id))
  }

  return (
    <Card position="relative" d="flex" flexDir="column" alignItems="center" gap={4} overflow="hidden">
      <Box position="absolute" inset={0} h={24} bg="brand.400" />

      <Box position="relative" mt={7} p={1} bg="white" borderRadius="full">
        <Avatar name="" src={baseURL + user.picture} size="xl" />
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
