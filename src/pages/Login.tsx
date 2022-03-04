import { SubmitHandler, useForm } from 'react-hook-form'
import { Link as RouterLink, Navigate } from 'react-router-dom'

import { Button, Heading, Image, Input, Link, Text, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'

import logoIcon from '../assets/images/logo-icon.svg'
import FormControl from '../components/UI/FormControl'
import { login, selectAuthUser } from '../store/features/authSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { loginSchema, LoginValues } from '../utils/validation'

const Login = () => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)

  const { register, handleSubmit, formState } = useForm<LoginValues>({
    resolver: yupResolver(loginSchema)
  })

  const onSubmit: SubmitHandler<LoginValues> = (data) => dispatch(login(data))

  if (authUser) return <Navigate to="/" replace />

  return (
    <>
      <VStack spacing={4} mb={16}>
        <Image src={logoIcon} alt="" boxSize={8} />

        <Heading as="h1" fontSize="2xl">
          Connexion
        </Heading>
      </VStack>

      <VStack as="form" spacing={6} align="stretch" onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormControl id="email" label="Email" error={formState.errors.email}>
          <Input id="email" type="email" size="lg" {...register('email')} />
        </FormControl>

        <FormControl id="password" label="Mot de passe" error={formState.errors.password}>
          <Input id="password" type="password" size="lg" {...register('password')} />
        </FormControl>

        <Button type="submit" size="lg" colorScheme="brand" isLoading={formState.isSubmitting} isFullWidth>
          Connexion
        </Button>
      </VStack>

      <Text align="center" mt={8}>
        Vous êtes nouveau ?{' '}
        <Link as={RouterLink} to="/signup" color="brand.500" fontWeight="medium">
          Créer un compte
        </Link>
      </Text>
    </>
  )
}

export default Login
