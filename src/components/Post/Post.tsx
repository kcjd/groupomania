import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { HiDotsHorizontal, HiExclamation, HiEyeOff, HiPencil, HiTrash } from 'react-icons/hi'
import { Link as RouterLink } from 'react-router-dom'
import TimeAgo from 'timeago-react'

import {
  AspectRatio, Button, ButtonGroup, Divider, HStack, Icon, IconButton, Image, Link, Menu,
  MenuButton, MenuItem, MenuList, Text, VStack
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'

import { baseURL } from '../../api/api'
import { selectAuthUser } from '../../store/features/authSlice'
import { selectCommentsByPost } from '../../store/features/commentsSlice'
import { addLike, deleteLike, selectLike, selectLikesByPost } from '../../store/features/likesSlice'
import {
  addPost, deletePost, deletePostMedia, editPost, hidePost
} from '../../store/features/postsSlice'
import { addReport, selectReportsByPost } from '../../store/features/reportsSlice'
import { selectUserById } from '../../store/features/usersSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { PostData } from '../../types/types'
import { postSchema, PostValues } from '../../utils/validation'
import Card from '../UI/Card'
import FileUpload from '../UI/FileUpload'
import TextareaAutosize from '../UI/TextareaAutosize'
import User from '../User/User'
import Comment from './Comment'
import LikeButton from './LikeButton'

interface Props {
  post?: PostData
}

interface FormValues extends PostValues {
  media: FileList
}

const Post = ({ post }: Props) => {
  const dispatch = useAppDispatch()

  const { register, handleSubmit, control, formState, watch, reset } = useForm<FormValues>({
    defaultValues: { content: post?.content },
    resolver: yupResolver(postSchema)
  })

  const selectedFile = watch('media')

  const [isEditing, setEditing] = useState(!post)

  const authUser = useAppSelector(selectAuthUser)
  const author = post ? useAppSelector((state) => selectUserById(state, post.authorId)) : authUser
  const likes = useAppSelector((state) => selectLikesByPost(state, post?.id)).length
  const userLike = useAppSelector((state) => selectLike(state, post?.id, authUser?.id))
  const reports = useAppSelector((state) => selectReportsByPost(state, post?.id)).length

  const comments = useAppSelector((state) => selectCommentsByPost(state, post?.id))

  const isAuthor = authUser?.id === author?.id
  const isModerator = authUser?.role === 'MODERATOR'

  const onReport = () => {
    if (!post) return
    dispatch(addReport(post.id))
  }

  const onLike = () => {
    if (!post) return

    if (userLike) {
      dispatch(deleteLike(post.id))
    } else {
      dispatch(addLike(post.id))
    }
  }

  const onDeleteMedia = () => {
    if (!post) return
    dispatch(deletePostMedia(post.id))
  }

  const onHide = () => {
    if (!post) return
    dispatch(hidePost(post.id))
  }

  const onDelete = () => {
    if (!post) return
    dispatch(deletePost(post.id))
  }

  const onSubmit: SubmitHandler<FormValues> = async (data, e) => {
    const postData = data.media ? new FormData(e?.target) : data

    if (post) {
      await dispatch(editPost({ postId: post.id, data: postData }))
      reset()
      setEditing(false)
    } else {
      await dispatch(addPost(postData))
      reset()
    }
  }

  return (
    <Card d="flex" flexDir="column" gap={4}>
      <HStack justify="space-between">
        <Link as={RouterLink} to={`/users/${author?.id}`}>
          {author && <User user={author} showAvatar />}
        </Link>

        {!isEditing && (
          <Menu placement="bottom-end">
            <MenuButton
              as={IconButton}
              size="sm"
              variant="ghost"
              icon={<Icon as={HiDotsHorizontal} boxSize={4} />}
              isRound
              aria-label="Options"
            />

            <MenuList>
              {isAuthor ? (
                <>
                  <MenuItem icon={<Icon as={HiPencil} boxSize={4} color="gray.500" />} onClick={() => setEditing(true)}>
                    Modifier
                  </MenuItem>

                  <MenuItem onClick={onDelete} icon={<Icon as={HiTrash} boxSize={4} color="gray.500" />}>
                    Supprimer
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem icon={<Icon as={HiExclamation} boxSize={4} color="gray.500" />} onClick={onReport}>
                    Signaler
                  </MenuItem>

                  {isModerator && (
                    <MenuItem onClick={onHide} icon={<Icon as={HiEyeOff} boxSize={4} color="gray.500" />}>
                      Masquer
                    </MenuItem>
                  )}
                </>
              )}
            </MenuList>
          </Menu>
        )}
      </HStack>

      {(selectedFile || post?.media) && (
        <AspectRatio ratio={16 / 9} mx={[-4, -6]}>
          <Image
            src={selectedFile ? URL.createObjectURL(selectedFile[0]) : baseURL + post?.media}
            alt=""
            objectFit="cover"
          />
        </AspectRatio>
      )}

      {isEditing ? (
        <VStack as="form" align="stretch" spacing={4} onSubmit={handleSubmit(onSubmit)}>
          <TextareaAutosize
            variant="unstyled"
            placeholder="Qu'avez-vous à partager ?"
            aria-label="Publication"
            autoFocus={Boolean(post)}
            {...register('content')}
          />

          <Divider />

          <ButtonGroup justifyContent="end">
            {post?.media ? (
              <Button onClick={onDeleteMedia}>Supprimer l'image</Button>
            ) : (
              <FileUpload name="media" control={control} />
            )}

            <Button type="submit" colorScheme="brand" isLoading={formState.isSubmitting}>
              {post ? 'Enregistrer' : 'Publier'}
            </Button>
          </ButtonGroup>
        </VStack>
      ) : (
        post && (
          <>
            <Text>{post.content}</Text>

            <HStack justify="space-between">
              <HStack>
                <LikeButton value={likes} isActive={Boolean(userLike)} onClick={onLike} />

                {isModerator && reports > 0 && (
                  <HStack>
                    <Icon as={HiExclamation} color="purple.500" boxSize={6} />

                    <Text fontSize="sm" fontWeight="semibold">
                      {reports}
                    </Text>
                  </HStack>
                )}
              </HStack>

              <Text
                as={TimeAgo}
                datetime={post.createdAt}
                locale="fr"
                opts={{ minInterval: 60 }}
                color="gray.500"
                fontSize="sm"
              />
            </HStack>

            <Divider />

            <VStack align="stretch" spacing={3}>
              {comments.map((comment) => (
                <Comment postId={post.id} comment={comment} key={comment.id} />
              ))}
            </VStack>

            <Comment postId={post.id} />
          </>
        )
      )}
    </Card>
  )
}

export default Post
