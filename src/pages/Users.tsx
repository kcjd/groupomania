import { Heading, SimpleGrid } from '@chakra-ui/react'

import { useAppSelector } from '../app/hooks'
import UserCard from '../components/UserCard'
import { selectAllUsers } from '../features/usersSlice'

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
