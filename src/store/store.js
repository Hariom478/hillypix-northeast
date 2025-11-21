import { configureStore } from '@reduxjs/toolkit'
import  authReducer  from './reducers/authenticationSlice'
import  subscriptionReducer  from './reducers/commonSlice'

export const store = configureStore({
  reducer: {
    authentication : authReducer,
    subscription: subscriptionReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
})