import React from 'react'
import { Page } from './Page'
import { UploadForm } from '../features/user/components/uploadManga/UploadForm'
import { PhotoList } from '../features/user/components/uploadManga/PhotoList'
import styles from '../features/user/components/uploadManga/UploadManga.scss'
export const ProfilePage = () => {
  return (
    <Page className={styles.photoWrapper}>
      <UploadForm />
      <PhotoList />
    </Page>
  )
}
