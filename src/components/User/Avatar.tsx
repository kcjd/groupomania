import { Avatar as ChakraAvatar, AvatarProps } from '@chakra-ui/react'

import { baseURL } from '../../api/api'
import { UserData } from '../../types/types'

interface Props extends AvatarProps {
  user?: UserData
}

const Avatar = ({ user, src, ...props }: Props) => {
  return <ChakraAvatar name="" src={src || (user?.picture && baseURL + user.picture)} {...props} />
}

export default Avatar
