import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { HiDotsHorizontal, HiExclamation, HiPencil, HiTrash, HiX } from 'react-icons/hi'
import { Link as RouterLink } from 'react-router-dom'
import TimeAgo from 'timeago-react'

import {
    AspectRatio, Box, Button, ButtonGroup, Divider, HStack, Icon, IconButton, Image, Link, Menu,
    MenuButton, MenuItem, MenuList, Text, VStack
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectAuthUser } from '../../features/authSlice'
import { selectCommentsByPost } from '../../features/commentsSlice'
import { addLike, deleteLike, selectLike, selectLikesByPost } from '../../features/likesSlice'
import { addPost, deletePost, editPost } from '../../features/postsSlice'
import { selectUserById } from '../../features/usersSlice'
import { PostData, PostValues } from '../../types/types'
import { postSchema } from '../../validation/validation'
import Card from '../UI/Card'
import FileUpload from '../UI/FileUpload'
import TextareaAutosize from '../UI/TextareaAutosize'
import User from '../User'
import Comment from './Comment'
import LikeButton from './LikeButton'

interface Props {
  post?: PostData
}

const Post = ({ post }: Props) => {
  const dispatch = useAppDispatch()

  const { register, handleSubmit, reset, control, formState } = useForm<PostValues>({
    defaultValues: { content: post?.content },
    resolver: yupResolver(postSchema)
  })

  const [isEditing, setEditing] = useState(!post)

  const authUser = useAppSelector(selectAuthUser)
  const author = post ? useAppSelector((state) => selectUserById(state, post.userId)) : authUser
  const likes = useAppSelector((state) => selectLikesByPost(state, post?.id)).length
  const userLike = useAppSelector((state) => selectLike(state, post?.id, authUser?.id))
  const comments = useAppSelector((state) => selectCommentsByPost(state, post?.id))

  const isAuthor = authUser?.id === author?.id
  const isModerator = authUser?.role === 'moderator'

  const onLike = () => {
    if (!post || !authUser) return

    if (userLike) {
      dispatch(deleteLike(userLike.id))
    } else {
      dispatch(addLike({ postId: post.id, userId: authUser.id }))
    }
  }

  const onDelete = () => {
    if (!post) return
    dispatch(deletePost(post.id))
  }

  const onSubmit: SubmitHandler<PostValues> = (data) => {
    if (!authUser) return
    if (post) {
      return dispatch(editPost({ id: post.id, data })).then(() => setEditing(false))
    } else {
      return dispatch(addPost({ ...data, userId: authUser.id })).then(() => reset())
    }
  }

  return (
    <Card as="article" d="flex" flexDir="column" gap={4}>
      <HStack justify="space-between">
        <Link as={RouterLink} to={`/profile/${author?.id}`}>
          {author && <User user={author} />}
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
              {!isAuthor && !isModerator && (
                <MenuItem icon={<Icon as={HiExclamation} boxSize={4} color="gray.500" />}>Signaler</MenuItem>
              )}

              {isAuthor && (
                <MenuItem icon={<Icon as={HiPencil} boxSize={4} color="gray.500" />} onClick={() => setEditing(true)}>
                  Modifier
                </MenuItem>
              )}

              {(isAuthor || isModerator) && (
                <MenuItem onClick={onDelete} icon={<Icon as={HiTrash} boxSize={4} color="gray.500" />}>
                  Supprimer
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        )}
      </HStack>

      {post?.media && (
        <Box position="relative" mx={-5}>
          <AspectRatio ratio={16 / 9}>
            <Image src={post.media} alt="" objectFit="cover" />
          </AspectRatio>

          {isEditing && (
            <IconButton
              position="absolute"
              top={4}
              right={4}
              size="sm"
              icon={<Icon as={HiX} />}
              aria-label="Supprimer"
              isRound
            />
          )}
        </Box>
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
            <FileUpload name="media" control={control} />

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
              <LikeButton value={likes} isActive={Boolean(userLike)} onClick={onLike} />

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
              {comments?.map((comment) => (
                <Comment comment={comment} key={comment.id} />
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
