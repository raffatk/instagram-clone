import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import commentModalSlice from './commentModalSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    modal: commentModalSlice
  },
})