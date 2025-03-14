import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MangaSlice } from './types'

const initialState: MangaSlice = {
  id: '1',
  name: 'One Piece',
  description: 'Охота за сокровищем',
  preview_id: '1',
  page_list: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
  created_at: new Date().toISOString(),
  preview_src: '',
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
