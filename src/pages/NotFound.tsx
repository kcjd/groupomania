import { HiChevronLeft } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

import { Button, Heading, Icon, Text, VStack } from '@chakra-ui/react'

const NotFound = () => {
  const navigate = useNavigate()

  const onClick = () => navigate(-1)

  return (
    <VStack justify="center" spacing={8} h="full">
      <VStack>
        <Text fontSize="5xl" fontWeight="semibold">
          404
        </Text>

        <Heading as="h1" color="gray.600" fontSize="lg" fontWeight="normal">
          La page demandée n'existe pas
        </Heading>
      </VStack>

      <Button colorScheme="brand" leftIcon={<Icon as={HiChevronLeft} boxSize={5} />} onClick={onClick}>
        Retour
      </Button>
    </VStack>
  )
}

export default NotFound
