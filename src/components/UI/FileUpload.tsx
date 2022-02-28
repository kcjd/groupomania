import { ChangeEventHandler, useRef } from 'react'
import { Control, useController } from 'react-hook-form'
import { HiCamera, HiX } from 'react-icons/hi'

import { Button, ButtonGroup, Icon, IconButton, Text } from '@chakra-ui/react'

interface Props {
  name: string
  control: Control<any>
}

const FileUpload = ({ name, control }: Props) => {
  const {
    field: { onChange, value }
  } = useController({ name, control, defaultValue: '' })

  const inputRef = useRef<HTMLInputElement>(null)

  const onClick = () => inputRef.current?.click()

  const onDelete = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
    }

    onChange('')
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => onChange(e.target.files)

  return (
    <>
      <ButtonGroup isAttached>
        <Button maxWidth={40} leftIcon={<Icon as={HiCamera} />} onClick={onClick}>
          <Text isTruncated>{value?.[0]?.name || 'Photo'}</Text>
        </Button>

        {value?.length > 0 && <IconButton icon={<Icon as={HiX} />} aria-label="Supprimer" onClick={onDelete} />}
      </ButtonGroup>

      <input
        type="file"
        accept="image/*"
        name={name}
        ref={inputRef}
        onChange={handleChange}
        aria-label="Sélectionner un fichier"
        hidden
      />
    </>
  )
}

export default FileUpload
