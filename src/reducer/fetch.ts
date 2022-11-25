import { createSlice } from '@reduxjs/toolkit'

interface ItemType {
  id: number
  title: string
}

interface FetchType {
  loading: boolean
  data: null | ItemType[]
  error: null | string
}

const initialState: FetchType = {
  loading: false,
  data: null,
  error: null,
}

export const fetchSlice = createSlice({
  name: 'fecth',
  initialState,
  reducers: {
    fetchStarted: (state) => {
      state.loading = true
    },
    fetchSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
      state.error = null
      console.log(action.payload)
    },
    fetchFailed: (state, action) => {
      state.loading = false
      state.data = null
      state.error = action.payload
    },
  },
})

export const { fetchStarted, fetchSuccess, fetchFailed } = fetchSlice.actions

export const fetchToken = (user: any) => async (dispath: any) => {
  try {
    dispath(fetchStarted())
    const res = await fetch(
      'https://dogsapi.origamid.dev/json/jwt-auth/v1/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      },
    )
    const data = await res.json()
    return dispath(fetchSuccess(data))
  } catch (err) {
    if (typeof err === 'string') {
      return dispath(fetchFailed(err))
    }
    if (err instanceof Error) {
      return dispath(fetchFailed(err.message))
    }
  }
}

export default fetchSlice.reducer
