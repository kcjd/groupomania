import { motion } from 'framer-motion'
import { PropsWithChildren } from 'react'
import { Link as RouterLink, useMatch, useResolvedPath } from 'react-router-dom'

import { Box, Link } from '@chakra-ui/react'

interface Props {
  to: string
}

const MotionBox = motion(Box)

const AppNavLink = ({ to, children }: PropsWithChildren<Props>) => {
  const resolved = useResolvedPath(to)
  const isActive = useMatch({ path: resolved.pathname, end: true })

  return (
    <Link
      as={RouterLink}
      to={to}
      position="relative"
      py={3}
      color={isActive ? 'brand.500' : 'gray.500'}
      fontWeight="medium"
    >
      {children}

      <MotionBox
        animate={{
          scaleX: isActive ? 1 : 0.4,
          opacity: isActive ? 1 : 0
        }}
        transition={{ duration: 0.2 }}
        initial={false}
        position="absolute"
        insetInline={0}
        bottom={0.5}
        w={10}
        h={1}
        mx="auto"
        rounded="full"
        bg="brand.500"
      />
    </Link>
  )
}

export default AppNavLink
