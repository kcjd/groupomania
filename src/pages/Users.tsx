import { Heading, SimpleGrid } from '@chakra-ui/react'

import UserCard from '../components/User/UserCard'
import { selectAllUsers } from '../store/features/usersSlice'
import { useAppSelector } from '../store/hooks'

const Users = () => {
  const users = useAppSelector(selectAllUsers)

  return (
    <>
      <Heading as="h1" fontSize="md" fontWeight="semibold" mb={6} color="gray.600">
        Tous les utilisateurs
      </Heading>

      <SimpleGrid columns={[1, 2]} gap={4}>
        {users.map((user) => (
          <UserCard user={user} key={user.id} />
        ))}
      </SimpleGrid>
    </>
  )
}

export default Users
