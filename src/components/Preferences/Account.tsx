import { Button, Text, VStack } from '@chakra-ui/react'

import { selectAuthUser } from '../../store/features/authSlice'
import { deleteUser } from '../../store/features/usersSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import Fieldset from '../UI/Fieldset'

const Account = () => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)

  const onDeleteAccount = () => {
    if (!authUser) return
    dispatch(deleteUser(authUser.id))
  }

  return (
    <VStack align="stretch" spacing={8}>
      <Fieldset legend="Supprimer le compte">
        <Text color="gray.500">
          La suppression de votre compte effacera vos données de profil ainsi que toutes vos publications et
          commentaires.
        </Text>
      </Fieldset>

      <Button size="lg" colorScheme="red" onClick={onDeleteAccount} isFullWidth>
        Supprimer mon compte
      </Button>
    </VStack>
  )
}

export default Account
