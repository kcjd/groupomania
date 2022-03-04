import { motion } from 'framer-motion'
import { HiHeart } from 'react-icons/hi'

import { Button, Icon } from '@chakra-ui/react'

interface Props {
  value: number
  isActive: boolean
  onClick: () => void
}

const LikeButton = ({ value, isActive, onClick }: Props) => {
  return (
    <Button
      size="sm"
      variant="blank"
      justifyContent="start"
      fontWeight="semibold"
      leftIcon={
        <motion.div
          animate={{
            scale: isActive ? [1, 1.2, 1] : [1, 0.9, 1]
          }}
          transition={{ duration: 0.3 }}
          initial={false}
        >
          <Icon as={HiHeart} boxSize={6} color={isActive ? 'red.400' : 'gray.400'} />
        </motion.div>
      }
      onClick={onClick}
    >
      {value}
    </Button>
  )
}

export default LikeButton
