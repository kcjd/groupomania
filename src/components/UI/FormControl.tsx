import { PropsWithChildren } from 'react'
import { FieldError } from 'react-hook-form'

import { FormControl as ChakraFormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'

interface Props {
  id: string
  label: string
  error?: FieldError
}

const FormControl = ({ id, label, error, children }: PropsWithChildren<Props>) => {
  return (
    <ChakraFormControl isInvalid={Boolean(error)}>
      <FormLabel htmlFor={id}>{label}</FormLabel>

      {children}

      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </ChakraFormControl>
  )
}

export default FormControl
