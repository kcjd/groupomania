import { Heading, HeadingProps } from '@chakra-ui/react'

const MainHeading = (props: HeadingProps) => {
  return <Heading as="h1" mb={[4, 6]} fontSize="md" fontWeight="semibold" color="gray.600" {...props} />
}

export default MainHeading
