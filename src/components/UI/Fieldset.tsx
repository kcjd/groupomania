import { PropsWithChildren } from 'react'

import { Text, VStack } from '@chakra-ui/react'

interface Props {
  legend: string
}

const Fieldset = ({ legend, children }: PropsWithChildren<Props>) => {
  return (
    <VStack as="fieldset" align="stretch" spacing={4}>
      <Text as="legend" fontWeight="semibold" color="gray.600">
        {legend}
      </Text>

      {children}
    </VStack>
  )
}

export default Fieldset
