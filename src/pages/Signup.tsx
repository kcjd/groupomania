import { SubmitHandler, useForm } from 'react-hook-form'
import { Link as RouterLink, Navigate } from 'react-router-dom'

import { Button, Heading, Image, Input, Link, Stack, Text, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'

import logoIcon from '../assets/images/logo-icon.svg'
import FormControl from '../components/FormControl'
import { selectAuthUser, signup } from '../store/features/authSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { signupSchema, SignupValues } from '../utils/validation'

const Signup = () => {
  const authUser = useAppSelector(selectAuthUser)
  const dispatch = useAppDispatch()

  const { register, handleSubmit, formState } = useForm<SignupValues>({
    resolver: yupResolver(signupSchema)
  })

  const onSubmit: SubmitHandler<SignupValues> = (data) => dispatch(signup(data))

  if (authUser) return <Navigate to="/" replace />

  return (
    <>
      <VStack spacing={4} mb={16}>
        <Image src={logoIcon} alt="" boxSize={8} />

        <Heading as="h1" fontSize="2xl">
          Inscription
        </Heading>
      </VStack>

      <VStack as="form" spacing={6} align="stretch" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack direction={['column', 'row']} spacing={[6, 4]}>
          <FormControl id="lastname" label="Nom" error={formState.errors.lastname}>
            <Input id="lastname" size="lg" {...register('lastname')} />
          </FormControl>

          <FormControl id="firstname" label="Prénom" error={formState.errors.firstname}>
            <Input id="firstname" size="lg" {...register('firstname')} />
          </FormControl>
        </Stack>

        <FormControl id="email" label="Email" error={formState.errors.email}>
          <Input id="email" type="email" size="lg" {...register('email')} />
        </FormControl>

        <FormControl id="password" label="Mot de passe" error={formState.errors.password}>
          <Input id="password" type="password" size="lg" {...register('password')} />
        </FormControl>

        <Button type="submit" size="lg" colorScheme="brand" isLoading={formState.isSubmitting} isFullWidth>
          Inscription
        </Button>
      </VStack>

      <Text align="center" mt={8}>
        Vous avez un compte ?{' '}
        <Link as={RouterLink} to="/login" color="brand.500" fontWeight="medium">
          Se connecter
        </Link>
      </Text>
    </>
  )
}

export default Signup
