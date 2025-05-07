import React, { useEffect } from 'react'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../utils/hooks/reduxHooks'
import { SearchItem } from './SearchItem'
import { Manga, SearchManga } from '../../../manga/store/types'
import styles from './SearchItem.module.scss'
import { fetch } from '../../../../utils/request/API'
import { ADDRESS_URL } from '../../../../app/config'
import { searchSlice } from '../../store/searchSlice'

export const SearchList = () => {
  const mangas = useAppSelector((state) => state.search.mangas)
  const dispatch = useAppDispatch()
  const token = useAppSelector((state) => state.user.token)
  const filters = useAppSelector((state) => state.search.filters)
  console.log(filters)
  useEffect(() => {
    if (mangas.length === 0) {
      fetch(
        'post',
        `${ADDRESS_URL}/search`,
        {
          params: { limit: 15, offset: 0, liked: filters.liked },
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
  }, [filters])
  return (
    <div className={styles.searchList}>
      {mangas.map(
        ({ id, name, description, preview_id, liked }: SearchManga) => {
          return (
            <SearchItem
              key={id}
              id={id}
              name={name}
              description={description}
              preview_id={preview_id}
              liked={liked}
            />
          )
        }
      )}
    </div>
  )
}
