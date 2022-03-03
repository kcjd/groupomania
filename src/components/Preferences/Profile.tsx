import { SubmitHandler, useForm } from 'react-hook-form'

import { Button, HStack, Input, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'

import { selectAuthUser } from '../../store/features/authSlice'
import { deleteUserPicture, editProfile } from '../../store/features/usersSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { ProfileValues, userSchema } from '../../utils/validation'
import Fieldset from '../UI/Fieldset'
import FileUpload from '../UI/FileUpload'
import FormControl from '../UI/FormControl'
import Avatar from '../User/Avatar'

interface FormValues extends ProfileValues {
  picture: FileList
}

const Profile = () => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)

  const { register, handleSubmit, control, formState, watch } = useForm<FormValues>({
    defaultValues: {
      lastname: authUser?.lastname,
      firstname: authUser?.firstname,
      position: authUser?.position
    },
    resolver: yupResolver(userSchema)
  })

  const selectedFile = watch('picture')

  const onDeletePicture = () => {
    if (!authUser) return

    dispatch(deleteUserPicture(authUser.id))
  }

  const onSubmit: SubmitHandler<FormValues> = async (data, e) => {
    const profileData = data.picture ? new FormData(e?.target) : data

    if (!authUser) return

    await dispatch(editProfile({ userId: authUser.id, data: profileData }))
  }

  return (
    <VStack as="form" align="stretch" spacing={8} onSubmit={handleSubmit(onSubmit)}>
      <Fieldset legend="Photo de profil">
        <HStack spacing={4}>
          <Avatar user={authUser} src={selectedFile ? URL.createObjectURL(selectedFile[0]) : undefined} size="lg" />

          {authUser?.picture ? (
            <Button onClick={onDeletePicture}>Supprimer la photo</Button>
          ) : (
            <FileUpload name="picture" control={control} />
          )}
        </HStack>
      </Fieldset>

      <Fieldset legend="Informations personnelles">
        <FormControl id="lastname" label="Nom" error={formState.errors.lastname}>
          <Input id="lastname" size="lg" {...register('lastname')} />
        </FormControl>

        <FormControl id="firstname" label="Prénom" error={formState.errors.firstname}>
          <Input id="firstname" size="lg" {...register('firstname')} />
        </FormControl>

        <FormControl id="position" label="Poste" error={formState.errors.position}>
          <Input id="position" size="lg" {...register('position')} />
        </FormControl>
      </Fieldset>

      <Button type="submit" size="lg" colorScheme="brand" isLoading={formState.isSubmitting} isFullWidth>
        Enregistrer
      </Button>
    </VStack>
  )
}

export default Profile
