import { Link as RouterLink } from 'react-router-dom'

import { LinkBox, LinkOverlay } from '@chakra-ui/react'

import { selectAuthUser } from '../../store/features/authSlice'
import { useAppSelector } from '../../store/hooks'
import { UserData } from '../../types/types'
import Card from '../UI/Card'
import FollowButton from './FollowButton'
import User from './User'

interface Props {
  user: UserData
}

const UserCard = ({ user }: Props) => {
  const authUser = useAppSelector(selectAuthUser)
  const isOwner = authUser?.id === user.id

  return (
    <LinkBox as={Card} d="flex" justifyContent="space-between" alignItems="center">
      <LinkOverlay as={RouterLink} to={`/users/${user.id}`}>
        <User user={user} showAvatar showFollowers />
      </LinkOverlay>

      {!isOwner && <FollowButton user={user} isIcon />}
    </LinkBox>
  )
}

export default UserCard
