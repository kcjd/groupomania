import { useParams } from 'react-router-dom'

import { Heading, VStack } from '@chakra-ui/react'

import { useAppSelector } from '../app/hooks'
import Feed from '../components/Feed'
import ProfileOverview from '../components/Profile/ProfileOverview'
import ProfileStats from '../components/Profile/ProfileStats'
import { selectAuthUser } from '../features/authSlice'
import { selectPostsByUser } from '../features/postsSlice'
import { selectUserById } from '../features/usersSlice'

const Profile = () => {
  const params = useParams()
  const userId = Number(params.userId)

  const user = useAppSelector((state) => selectUserById(state, userId))
  const authUser = useAppSelector(selectAuthUser)

  const posts = useAppSelector((state) => selectPostsByUser(state, userId))

  const isOwner = authUser?.id === user?.id

  if (!user) return null

  return (
    <>
      <Heading as="h1" fontSize="md" fontWeight="semibold" mb={6} color="gray.600">
        {isOwner ? 'Mon profil' : `Profil de ${user.firstname}`}
      </Heading>

      <VStack align="stretch" spacing={8}>
        <ProfileOverview user={user} />

        <ProfileStats user={user} />

        <Feed posts={posts} />
      </VStack>
    </>
  )
}

export default Profile
