import { HiUserAdd, HiUserRemove } from 'react-icons/hi'

import { Button, Icon, IconButton } from '@chakra-ui/react'

import { selectAuthUser } from '../store/features/authSlice'
import { addFollow, deleteFollow, selectFollow } from '../store/features/followsSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { UserData } from '../types/types'

interface Props {
  user: UserData
  isIcon?: boolean
}

const FollowButton = ({ user, isIcon }: Props) => {
  const dispatch = useAppDispatch()

  const authUser = useAppSelector(selectAuthUser)
  const existingFollow = useAppSelector((state) => selectFollow(state, authUser?.id, user.id))

  const variant = existingFollow ? 'solid' : 'outline'
  const icon = existingFollow ? <Icon as={HiUserRemove} boxSize={5} /> : <Icon as={HiUserAdd} boxSize={5} />
  const label = existingFollow ? 'Se désabonner' : "S'abonner"
  const onClick = existingFollow ? () => dispatch(deleteFollow(user.id)) : () => dispatch(addFollow(user.id))

  return (
    <>
      {isIcon ? (
        <IconButton variant={variant} icon={icon} aria-label={label} onClick={onClick} isRound />
      ) : (
        <Button variant={variant} leftIcon={icon} onClick={onClick}>
          {label}
        </Button>
      )}
    </>
  )
}

export default FollowButton
