import { SubmitHandler, useForm } from 'react-hook-form'
import { Link as RouterLink } from 'react-router-dom'

import { Button, Heading, Image, Input, Link, Stack, Text, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'

import logoIcon from '../../assets/images/logo-icon.svg'
import FormControl from '../../components/FormControl'
import { SignupFields } from '../../types/types'
import { signupSchema } from '../../validation/validation'

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignupFields>({ resolver: yupResolver(signupSchema) })

  const onSubmit: SubmitHandler<SignupFields> = (data) => console.log(data)

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
          <FormControl id="lastname" label="Nom" error={errors.lastname}>
            <Input id="lastname" size="lg" {...register('lastname')} />
          </FormControl>

          <FormControl id="firstname" label="Prénom" error={errors.firstname}>
            <Input id="firstname" size="lg" {...register('firstname')} />
          </FormControl>
        </Stack>

        <FormControl id="email" label="Email" error={errors.email}>
          <Input id="email" type="email" size="lg" {...register('email')} />
        </FormControl>

        <FormControl id="password" label="Mot de passe" error={errors.password}>
          <Input id="password" type="password" size="lg" {...register('password')} />
        </FormControl>

        <Button type="submit" size="lg" colorScheme="brand" isLoading={isSubmitting} isFullWidth>
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
