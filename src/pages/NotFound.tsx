import { HiExclamationCircle } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

import { Button, Heading, Icon, VStack } from '@chakra-ui/react'

interface Props {
  message?: string
}

const NotFound = ({ message }: Props) => {
  const navigate = useNavigate()

  const onClick = () => navigate(-1)

  return (
    <VStack justify="center" spacing={8} h="full">
      <VStack>
        <Icon as={HiExclamationCircle} boxSize={16} color="gray.300" />

        <Heading as="h1" color="gray.600" fontSize="md" fontWeight="semibold">
          {message || "Cette page n'existe pas"}
        </Heading>
      </VStack>

      <Button colorScheme="brand" onClick={onClick}>
        Retour
      </Button>
    </VStack>
  )
}

export default NotFound
