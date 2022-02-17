import { Link as RouterLink } from 'react-router-dom'

import { Link } from '@chakra-ui/react'

import { UserData } from '../../types/types'
import Card from '../UI/Card'
import User from './User'

interface Props {
  user: UserData
}

const UserCard = ({ user }: Props) => {
  return (
    <Link as={RouterLink} to={`/profile/${user.id}`}>
      <Card as="article">
        <User user={user} />
      </Card>
    </Link>
  )
}

export default UserCard
