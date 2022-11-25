import { configureStore } from '@reduxjs/toolkit'
import fetchReducer from '../reducer/fetch'
import listReducer from '../reducer/list'

export const store = configureStore({
  reducer: {
    fetch: fetchReducer,
    list: listReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
