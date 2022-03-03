import { configureStore } from '@reduxjs/toolkit'

import authReducer from './features/authSlice'
import commentsReducer from './features/commentsSlice'
import followsReducer from './features/followsSlice'
import likesReducer from './features/likesSlice'
import modalsReducer from './features/modalsSlice'
import postsReducer from './features/postsSlice'
import reportsReducer from './features/reportsSlice'
import usersReducer from './features/usersSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    comments: commentsReducer,
    follows: followsReducer,
    likes: likesReducer,
    posts: postsReducer,
    reports: reportsReducer,
    users: usersReducer,
    modals: modalsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
