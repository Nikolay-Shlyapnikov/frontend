import React from 'react'
import { fetch } from '../../../../utils/request/API'
import { ADDRESS_URL } from '../../../../app/config'
import { Manga } from '../../../manga/store/types'
import { searchSlice } from '../../store/searchSlice'
import { SearchList } from './SearchList'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../utils/hooks/reduxHooks'

export const InSearch = () => {
  const dispatch = useAppDispatch()
  const token = useAppSelector((state) => state.user.token)

  const handleSearch = () => {
    fetch(
      'post',
      `${ADDRESS_URL}/search`,
      {
        params: { limit: 10, offset: 0 },
        headers: {
          token,
        },
      },
      (response) => {
        if (response.data) {
          if (response.data && response.data.length > 0) {
            const mangas = response.data as unknown as Manga[]
            console.log({ mangas })
            dispatch(searchSlice.actions.setSearch({ mangas }))
          }
        } else {
          console.error(response)
        }
      }
    )
  }

  return (
    <div>
      <input type="text" placeholder="Поиск" />
      <button onClick={handleSearch}>Получить</button>
      <SearchList />
    </div>
  )
}
