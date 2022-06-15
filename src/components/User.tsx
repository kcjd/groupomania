import { HiShieldCheck, HiUsers } from 'react-icons/hi'

import { HStack, Icon, Text, VStack } from '@chakra-ui/react'

import { selectFollowersByUser } from '../store/features/followsSlice'
import { useAppSelector } from '../store/hooks'
import { UserData } from '../types/types'
import Avatar from './Avatar'

interface Props {
  user: UserData
  isCentered?: boolean
  showAvatar?: boolean
  showFollowers?: boolean
}

const User = ({ user, isCentered, showAvatar, showFollowers }: Props) => {
  const followers = useAppSelector((state) => selectFollowersByUser(state, user.id))

  return (
    <HStack spacing={4}>
      {showAvatar && <Avatar size={showFollowers ? 'lg' : 'md'} user={user} />}

      <VStack align={isCentered ? 'center' : 'start'} spacing={0}>
        <HStack spacing={1}>
          <Text fontWeight="semibold">
            {user.firstname} {user.lastname}
          </Text>

          {user.role === 'MODERATOR' && <Icon as={HiShieldCheck} color="purple.500" />}
        </HStack>

        <Text color="gray.500" fontSize="sm">
          {user.position || 'Nouvel utilisateur'}
        </Text>

        {showFollowers && (
          <HStack spacing={1} color="gray.500">
            <Icon as={HiUsers} />

            <Text fontSize="sm">
              {followers.length} {followers.length > 1 ? 'abonnés' : 'abonné'}
            </Text>
          </HStack>
        )}
      </VStack>
    </HStack>
  )
}

export default User
