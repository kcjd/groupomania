import { forwardRef } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'

import { Textarea, TextareaProps } from '@chakra-ui/react'

const TextareaAutosize = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  return (
    <Textarea
      minH="unset"
      overflow="hidden"
      w="full"
      px={0}
      resize="none"
      ref={ref}
      minRows={1}
      maxRows={8}
      as={ReactTextareaAutosize}
      {...props}
    />
  )
})

export default TextareaAutosize
