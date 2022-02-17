import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { HiCheck, HiReply } from 'react-icons/hi'
import { Link as RouterLink } from 'react-router-dom'
import TimeAgo from 'timeago-react'

import {
    Avatar, Box, Button, HStack, Icon, IconButton, Input, Link, Text, VStack
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectAuthUser } from '../../features/authSlice'
import { addComment, deleteComment, editComment } from '../../features/commentsSlice'
import { selectUserById } from '../../features/usersSlice'
import { CommentData, CommentValues } from '../../types/types'
import { commentSchema } from '../../validation/validation'

interface Props {
  comment?: CommentData
  postId?: number
}

const Comment = ({ comment, postId }: Props) => {
  const dispatch = useAppDispatch()

  const { register, handleSubmit, reset, formState } = useForm<CommentValues>({
    defaultValues: { content: comment?.content },
    resolver: yupResolver(commentSchema)
  })

  const [isEditing, setEditing] = useState(!comment)

  const authUser = useAppSelector(selectAuthUser)
  const author = comment ? useAppSelector((state) => selectUserById(state, comment.userId)) : authUser

  const isAuthor = authUser?.id === author?.id
  const isModerator = authUser?.role === 'moderator'

  const onDelete = () => {
    if (comment) dispatch(deleteComment(comment.id))
  }

  const onSubmit: SubmitHandler<CommentValues> = (data) => {
    if (!authUser) return
    if (comment) {
      return dispatch(editComment({ id: comment.id, data })).then(() => setEditing(false))
    } else if (postId) {
      return dispatch(addComment({ ...data, postId: postId, userId: authUser.id })).then(() => reset())
    }
  }

  return (
    <HStack align="start" spacing={4}>
      <Avatar name="" src={author?.picture} size="sm" />

      {isEditing ? (
        <HStack as="form" flex={1} spacing={4} onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Écrire un commentaire..."
            variant="unstyled"
            size="sm"
            aria-label="Commentaire"
            autoFocus={Boolean(comment)}
            {...register('content')}
          />

          <IconButton
            type="submit"
            size="sm"
            icon={<Icon as={comment ? HiCheck : HiReply} />}
            aria-label="Envoyer"
            isLoading={formState.isSubmitting}
            isRound
          />
        </HStack>
      ) : (
        <VStack align="stretch" spacing={1} flex={1}>
          <Box maxW="max-content" p={2} borderRadius="lg" bg="gray.100" color="gray.700">
            <Text fontWeight="semibold">
              <Link as={RouterLink} to={`/profile/${author?.id}`}>
                {author?.firstname} {author?.lastname}
              </Link>
            </Text>

            <Text>{comment?.content}</Text>
          </Box>

          <HStack spacing={3}>
            {comment && (
              <Text
                as={TimeAgo}
                datetime={comment.createdAt}
                locale="fr"
                opts={{ minInterval: 60 }}
                color="gray.500"
                fontSize="sm"
              />
            )}

            {isAuthor && (
              <Button variant="link" size="sm" onClick={() => setEditing(true)}>
                modifier
              </Button>
            )}

            {(isAuthor || isModerator) && (
              <Button variant="link" size="sm" onClick={onDelete}>
                supprimer
              </Button>
            )}
          </HStack>
        </VStack>
      )}
    </HStack>
  )
}

export default Comment
