import { SubmitHandler, useForm } from 'react-hook-form'

import { Button, Input, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'

import { selectAuthUser } from '../../store/features/authSlice'
import { editPassword } from '../../store/features/usersSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { passwordSchema, PasswordValues } from '../../utils/validation'
import Fieldset from '../UI/Fieldset'
import FormControl from '../UI/FormControl'

const Security = () => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)

  const { register, handleSubmit, formState, reset } = useForm<PasswordValues>({
    resolver: yupResolver(passwordSchema)
  })

  const onSubmit: SubmitHandler<PasswordValues> = async (data) => {
    if (!authUser) return

    await dispatch(editPassword({ userId: authUser.id, data }))

    reset()
  }

  return (
    <VStack as="form" align="stretch" spacing={8} onSubmit={handleSubmit(onSubmit)}>
      <Fieldset legend="Changer de mot de passe">
        <FormControl id="password" label="Mot de passe" error={formState.errors.password}>
          <Input id="password" type="password" size="lg" {...register('password')} />
        </FormControl>

        <FormControl id="newPassword" label="Nouveau mot de passe" error={formState.errors.newPassword}>
          <Input id="newPassword" type="password" size="lg" {...register('newPassword')} />
        </FormControl>
      </Fieldset>

      <Button type="submit" size="lg" colorScheme="brand" isLoading={formState.isSubmitting} isFullWidth>
        Enregistrer
      </Button>
    </VStack>
  )
}

export default Security
