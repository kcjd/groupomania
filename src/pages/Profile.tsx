import { useParams } from 'react-router-dom'

import Feed from '../components/Feed'
import MainHeading from '../components/MainHeading'
import UserBanner from '../components/UserBanner'
import { selectPostsByUser } from '../store/features/postsSlice'
import { selectUserById } from '../store/features/usersSlice'
import { useAppSelector } from '../store/hooks'
import NotFound from './NotFound'

const Profile = () => {
  const params = useParams()
  const userId = Number(params.userId)

  const user = useAppSelector((state) => selectUserById(state, userId))
  const posts = useAppSelector((state) => selectPostsByUser(state, userId))

  return (
    <>
      {user ? (
        <>
          <MainHeading>Profil de {user.firstname}</MainHeading>
          <Feed posts={posts}>{user && <UserBanner user={user} />}</Feed>
        </>
      ) : (
        <NotFound message="Cet utilisateur n'existe pas" />
      )}
    </>
  )
}

export default Profile
