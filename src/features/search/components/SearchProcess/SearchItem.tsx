import React from 'react'
import { SearchManga } from '../../../manga/store/types'
import { PHOTO_URL } from '../../../../app/config'
import styles from './SearchItem.module.scss'
import Default from '../../../../assets/manga/default.svg'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../../utils/hooks/reduxHooks'
import { mangaSlice } from '../../../manga/store/store'
import { ImageWithLoader } from '../../../../ui-lib/ImageWithLoader/ui/ImageWithLoader'

export type SearchItemProps = SearchManga

export const SearchItem: React.FC<SearchItemProps> = ({
  id,
  name,
  description,
  preview_id,
  liked,
}) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const handleClickManga = () => {
    dispatch(
      mangaSlice.actions.setManga({ id, name, description, preview_id, liked })
    )
    navigate(`/manga/${id}`)
  }
  return (
    <div className={styles.searchItem} onClick={handleClickManga}>
      {preview_id === null ? (
        <Default />
      ) : (
        <ImageWithLoader
          src={`${PHOTO_URL}/manga?page_id=${preview_id}&manga_id=${id}`}
          alt="Описание изображения"
          className={styles.searchPreview}
        />
      )}
      <p>Идентификатор: {id}</p>
      <p>Название: {name}</p>
      <p>Описание: {description}</p>
    </div>
  )
}
