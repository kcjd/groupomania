import { Text, VStack } from '@chakra-ui/react'

import Card from '../components/UI/Card'
import MainHeading from '../components/UI/MainHeading'
import UserCard from '../components/User/UserCard'
import { selectAllUsers } from '../store/features/usersSlice'
import { useAppSelector } from '../store/hooks'

const Users = () => {
  const users = useAppSelector(selectAllUsers)

  return (
    <>
      <MainHeading>Tous les utilisateurs</MainHeading>

      {users.length < 1 ? (
        <Card>
          <Text color="gray.500" fontSize="sm" textAlign="center">
            Aucun utilisateur
          </Text>
        </Card>
      ) : (
        <VStack align="stretch" spacing={4}>
          {users.map((user) => (
            <UserCard user={user} key={user.id} />
          ))}
        </VStack>
      )}
    </>
  )
}

export default Users
