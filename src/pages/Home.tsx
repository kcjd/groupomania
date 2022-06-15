import Feed from '../components/Feed'
import Post from '../components/Post'
import MainHeading from '../components/MainHeading'
import { selectAllPosts } from '../store/features/postsSlice'
import { useAppSelector } from '../store/hooks'

const Home = () => {
  const posts = useAppSelector(selectAllPosts)

  return (
    <>
      <MainHeading>Fil d'actualité</MainHeading>

      <Feed posts={posts}>
        <Post />
      </Feed>
    </>
  )
}

export default Home
