import { PropsWithChildren } from 'react'

import { Text, VStack } from '@chakra-ui/react'

import { PostData } from '../types/types'
import Post from './Post'
import Card from './Card'

interface Props {
  posts: PostData[]
}

const Feed = ({ posts, children }: PropsWithChildren<Props>) => {
  return (
    <VStack align="stretch" spacing={[4, 8]}>
      {children}

      {posts.length < 1 ? (
        <Card>
          <Text color="gray.500" fontSize="sm" textAlign="center">
            Aucune publication
          </Text>
        </Card>
      ) : (
        posts.map((post) => <Post post={post} key={post.id} />).reverse()
      )}
    </VStack>
  )
}

export default Feed
