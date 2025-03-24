import React from 'react'
import { useAppSelector } from '../../../../utils/hooks/reduxHooks'
import { SearchItem } from './SearchItem'
import { SearchManga } from '../../../manga/store/types'
import styles from './SearchItem.module.scss'

export const SearchList = () => {
  const mangas = useAppSelector((state) => state.search.mangas)
  console.log(mangas)
  return (
    <div className={styles.searchList}>
      {mangas.map(({ id, name, description, preview_id }: SearchManga) => {
        return (
          <SearchItem
            key={id}
            id={id}
            name={name}
            description={description}
            preview_id={preview_id}
          />
        )
      })}
    </div>
  )
}
