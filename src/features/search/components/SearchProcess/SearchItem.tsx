import React from 'react'
import { SearchManga } from '../../../manga/store/types'
import { PHOTO_URL } from '../../../../app/config'
import styles from './SearchItem.module.scss'
import Default from '../../../../assets/manga/default.svg'
export type SearchItemProps = SearchManga

export const SearchItem: React.FC<SearchItemProps> = ({
  id,
  name,
  description,
  preview_id,
}) => (
  <div className={styles.searchItem}>
    {preview_id === null ? (
      <Default />
    ) : (
      <img
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
