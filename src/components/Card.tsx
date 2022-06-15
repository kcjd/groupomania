import { Box, BoxProps } from '@chakra-ui/react'

const Card = (props: BoxProps) => {
  return <Box as="article" p={[4, 6]} borderRadius="lg" bg="white" {...props} />
}

export default Card
