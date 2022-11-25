import { createSlice } from '@reduxjs/toolkit'

interface ItemType {
  id: number
  title: string
  src: string
  acessos: string
}

interface FetchType {
  loading: boolean
  data: ItemType[]
  error: null | string
}

const initialState: FetchType = {
  loading: false,
  data: [],
  error: null,
}

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    loading: (state) => {
      state.loading = true
    },
    initialLoad: (state, action) => {
      state.loading = false
      state.data.push(...action.payload)
    },
    errorLoad: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { loading, initialLoad, errorLoad } = listSlice.actions

export const loadingList = (page: number) => async (dispatch: any) => {
  dispatch(loading())
  try {
    const response = await fetch(
      `https://dogsapi.origamid.dev/json/api/photo/?_page=${page}&_total=3&_user=0`,
    )
    const data = await response.json()
    dispatch(initialLoad(data))
  } catch (err) {
    if (typeof err === 'string') {
      dispatch(errorLoad(err))
    }
    if (err instanceof Error) {
      dispatch(errorLoad(err.message))
    }
  }
}

export default listSlice.reducer
