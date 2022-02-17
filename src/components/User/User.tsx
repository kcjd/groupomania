import { Avatar, HStack, Text } from '@chakra-ui/react'

import { UserData } from '../../types/types'

interface Props {
  user: UserData
}

const User = ({ user }: Props) => {
  return (
    <HStack spacing={4}>
      <Avatar name="" src={user.picture} />

      <div>
        <Text fontWeight="semibold">
          {user.firstname} {user.lastname}
        </Text>

        <Text color="gray.500" fontSize="sm">
          {user.position}
        </Text>
      </div>
    </HStack>
  )
}

export default User
