import { Divider, HStack, Stat, StatLabel, StatNumber } from '@chakra-ui/react'

import { useAppSelector } from '../../app/hooks'
import { selectFollowersByUser, selectFollowingByUser } from '../../features/followsSlice'
import { UserData } from '../../types/types'
import Card from '../UI/Card'

interface Props {
  user: UserData
}

const ProfileStats = ({ user }: Props) => {
  const followers = useAppSelector((state) => selectFollowersByUser(state, user.id))
  const following = useAppSelector((state) => selectFollowingByUser(state, user.id))

  return (
    <Card>
      <HStack h={14} mx="auto" textAlign="center">
        <Stat flex={1}>
          <StatNumber fontSize="xl">{following.length}</StatNumber>
          <StatLabel color="gray.500" fontWeight="normal">
            Abonnements
          </StatLabel>
        </Stat>

        <Divider orientation="vertical" />

        <Stat flex={1}>
          <StatNumber fontSize="xl">{followers.length}</StatNumber>
          <StatLabel color="gray.500" fontWeight="normal">
            Abonnés
          </StatLabel>
        </Stat>
      </HStack>
    </Card>
  )
}

export default ProfileStats
