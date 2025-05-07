import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MangaSlice } from './types'

const initialState: MangaSlice = {
  id: '',
  name: '',
  description: '',
  preview_id: '',
  page_list: [''],
  created_at: new Date().toISOString(),
  preview_src: '',
  isLoading: false,
  uploadManga: {
    photos: [],
  },
  liked: false,
}

export const mangaSlice = createSlice({
  name: 'mangaSlice',
  initialState,
  reducers: {
    setManga: (state, action: PayloadAction<Partial<MangaSlice>>) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { setManga } = mangaSlice.actions
export default mangaSlice.reducer
