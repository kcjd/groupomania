import { HiUserAdd, HiUserRemove } from 'react-icons/hi'

import { Button, Icon, IconButton } from '@chakra-ui/react'

import { selectAuthUser } from '../../store/features/authSlice'
import { addFollow, deleteFollow, selectFollow } from '../../store/features/followsSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { UserData } from '../../types/types'

interface Props {
  user: UserData
  isIcon?: boolean
}

const FollowButton = ({ user, isIcon }: Props) => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)

  const existingFollow = useAppSelector((state) => selectFollow(state, authUser?.id, user.id))

  const onFollow = () => dispatch(addFollow(user.id))
  const onUnfollow = () => dispatch(deleteFollow(user.id))

  const colorScheme = existingFollow ? undefined : 'brand'
  const icon = existingFollow ? <Icon as={HiUserRemove} boxSize={5} /> : <Icon as={HiUserAdd} boxSize={5} />
  const label = existingFollow ? 'Se désabonner' : "S'abonner"
  const onClick = existingFollow ? onUnfollow : onFollow

  return (
    <>
      {isIcon ? (
        <IconButton colorScheme={colorScheme} icon={icon} aria-label={label} onClick={onClick} isRound />
      ) : (
        <Button colorScheme={colorScheme} leftIcon={icon} onClick={onClick}>
          {label}
        </Button>
      )}
    </>
  )
}

export default FollowButton
