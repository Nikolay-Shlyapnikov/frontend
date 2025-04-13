import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getManga } from '../../store/reducers/getManga'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../utils/hooks/reduxHooks'
import { Loader } from '../../../../ui-lib/Loader/ui/Loader'
import styles from './Manga.scss'
import { PHOTO_URL } from '../../../../app/config'
import { mangaSlice } from '../../store/store'
import { ImageWithLoader } from '../../../../ui-lib/ImageWithLoader/ui/ImageWithLoader'

export const Manga = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const manga = useAppSelector((state) => state.manga)

  useEffect(() => {
    if (id) {
      dispatch(getManga(id))
    }
  }, [id])

  useEffect(() => {
    if (manga.preview_id === '' && manga.page_list[0]) {
      dispatch(mangaSlice.actions.setManga({ preview_id: manga.page_list[0] }))
    }
  }, [manga])

  return (
    <div className={styles.mangaWrapper}>
      <aside className={styles.aside}>
        <div className={styles.asidePreviewWrapper}>
          <ImageWithLoader
            src={`${PHOTO_URL}/manga?page_id=${manga.preview_id}&manga_id=${id}`}
            className={styles.asidePreview}
            alt="Превью манги"
          />
        </div>
        <div className={styles.asideMenu}>
          <div className={styles.mangaTitle}>Какое-то поле</div>
          <div className={styles.mangaTitle}>Какое-то поле</div>
          <div className={styles.mangaTitle}>Какое-то поле</div>
          <div className={styles.mangaTitle}>Какое-то поле</div>
          <div className={styles.mangaTitle}>Какое-то поле</div>
          <div className={styles.mangaTitle}>Какое-то поле</div>
          <div className={styles.mangaTitle}>Какое-то поле</div>
        </div>
      </aside>
      <div className={styles.manga}>
        <h1 className={styles.mangaTitle}>
          Название: {!manga.name && manga.isLoading ? <Loader /> : manga.name}
        </h1>
        <p className={styles.mangaDescription}>Описание: {manga.description}</p>
        <div>
          {manga.page_list.map((page, index) => (
            <ImageWithLoader
              key={page}
              src={`${PHOTO_URL}/manga?page_id=${page}&manga_id=${id}`}
              alt={`Фото манги №${index}`}
              size={150}
              thickness={5}
              className={styles.mangaImage}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
