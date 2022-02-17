import { Heading, VStack } from '@chakra-ui/react'

import { useAppSelector } from '../app/hooks'
import Feed from '../components/Feed'
import Post from '../components/Post/Post'
import { selectAllPosts } from '../features/postsSlice'

const Home = () => {
  const posts = useAppSelector(selectAllPosts)

  return (
    <>
      <Heading as="h1" mb={6} fontSize="md" fontWeight="semibold" color="gray.600">
        Fil d'actualité
      </Heading>

      <VStack align="stretch" spacing={8}>
        <Post />

        <Feed posts={posts} />
      </VStack>
    </>
  )
}

export default Home
