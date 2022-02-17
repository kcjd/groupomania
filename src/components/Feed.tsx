import { Text, VStack } from '@chakra-ui/react'

import { PostData } from '../types/types'
import Post from './Post/Post'
import Card from './UI/Card'

interface Props {
  posts: PostData[]
}

const Feed = ({ posts }: Props) => {
  return (
    <VStack as="section" align="stretch" spacing={8}>
      {posts.length < 1 ? (
        <Card>
          <Text color="gray.500" fontSize="sm" textAlign="center">
            Aucune publication
          </Text>
        </Card>
      ) : (
        posts.map((post) => <Post post={post} key={post.id} />)
      )}
    </VStack>
  )
}

export default Feed
