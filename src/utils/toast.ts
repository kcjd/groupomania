import { AlertStatus, createStandaloneToast } from '@chakra-ui/react'

import theme from '../theme/theme'

const createToast = createStandaloneToast({ theme })

export default (status: AlertStatus, message: string) => {
  const existingToast = document.querySelector('.chakra-toast')

  if (existingToast) {
    return
  }

  createToast({
    description: message,
    status,
    variant: 'subtle'
  })
}
