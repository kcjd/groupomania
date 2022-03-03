import { AlertStatus, createStandaloneToast } from '@chakra-ui/react'

import theme from '../theme/theme'

const createToast = createStandaloneToast({ theme })

export default (status: AlertStatus, message: string) => {
  createToast.closeAll()

  createToast({
    description: message,
    status,
    variant: 'subtle',
    duration: 4000
  })
}
