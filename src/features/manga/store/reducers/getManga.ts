import { AppDispatch } from '../../../../utils/store/store'
import { fetch } from '../../../../utils/request/API'
import { ADDRESS_URL } from '../../../../app/config'
import { mangaSlice } from '../store'

export const getManga = (id: string) => (dispatch: AppDispatch) => {
	dispatch(mangaSlice.actions.setManga({ isLoading: true }))
	fetch(
		'get',
		`${ADDRESS_URL}/manga`,
		{
			params: { id },
		},
		(response) => {
			dispatch(mangaSlice.actions.setManga(response.data))
			dispatch(mangaSlice.actions.setManga({ isLoading: false }))
		},
	)
}
