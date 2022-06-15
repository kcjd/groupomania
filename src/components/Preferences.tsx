import { HiX } from 'react-icons/hi'

import {
  Icon, IconButton, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Tab, TabList,
  TabPanel, TabPanels, Tabs
} from '@chakra-ui/react'

import { selectAuthUser } from '../store/features/authSlice'
import { closePreferences } from '../store/features/modalsSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import Account from './Account'
import Profile from './Profile'
import Security from './Security'

const Preferences = () => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const { preferences } = useAppSelector((state) => state.modals)
  const isOpen = preferences.isOpen

  const onClose = () => dispatch(closePreferences())

  if (!authUser) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />

      <ModalContent>
        <ModalHeader d="flex" justifyContent="space-between" alignItems="center" fontSize="lg" fontWeight="semibold">
          Préférences
          <IconButton
            size="sm"
            variant="ghost"
            icon={<Icon as={HiX} boxSize={4} />}
            aria-label="Fermer"
            onClick={onClose}
            isRound
          />
        </ModalHeader>

        <ModalBody>
          <Tabs variant="soft-rounded" colorScheme="gray">
            <TabList mb={2}>
              <Tab>Profil</Tab>

              <Tab>Sécurité</Tab>

              <Tab>Compte</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Profile />
              </TabPanel>

              <TabPanel>
                <Security />
              </TabPanel>

              <TabPanel>
                <Account />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default Preferences
