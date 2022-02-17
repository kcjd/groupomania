import { Box, BoxProps } from '@chakra-ui/react'

const Card = (props: BoxProps) => {
  return <Box p={5} borderRadius="lg" bg="white" {...props} />
}

export default Card
