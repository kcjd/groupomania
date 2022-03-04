import { HiPencilAlt } from 'react-icons/hi'

import { Box, Button, Icon, VStack } from '@chakra-ui/react'

import { selectAuthUser } from '../../store/features/authSlice'
import { openPreferences } from '../../store/features/modalsSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { UserData } from '../../types/types'
import Card from '../UI/Card'
import Avatar from './Avatar'
import FollowButton from './FollowButton'
import User from './User'

interface Props {
  user: UserData
}

const UserBanner = ({ user }: Props) => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)

  const isOwner = authUser?.id === user.id

  const onOpenPreferences = () => dispatch(openPreferences())

  return (
    <Card position="relative" d="flex" flexDir="column" alignItems="center" gap={4} py={8} overflow="hidden">
      <Box position="absolute" inset={0} h={24} bg="brand.400" />

      <VStack mt={6}>
        <Avatar user={user} size="xl" showBorder />

        <User user={user} isCentered showFollowers />
      </VStack>

      {isOwner ? (
        <Button colorScheme="brand" leftIcon={<Icon as={HiPencilAlt} />} onClick={onOpenPreferences}>
          Modifier le profil
        </Button>
      ) : (
        <FollowButton user={user} />
      )}
    </Card>
  )
}

export default UserBanner
