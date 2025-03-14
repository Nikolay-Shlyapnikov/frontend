import React from 'react'
import { SearchManga } from '../../../manga/store/types'
import { PHOTO_URL } from '../../../../app/config'

export type SearchItemProps = SearchManga

export const SearchItem: React.FC<SearchItemProps> = ({
  id,
  name,
  description,
  preview_id,
}) => (
  <div>
    <p>Идентификатор: {id}</p>
    <p>Название: {name}</p>
    <p>Описание: {description}</p>
    <img src={`${PHOTO_URL}/manga?id=${preview_id}`} alt="Превью" />
  </div>
)
