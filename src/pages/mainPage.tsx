import React from 'react'

import { UploadManga } from '../features/user/uploadManga/UploadManga'
import { Header } from '../features/header/Header'
import { SearchList } from '../features/search/components/SearchProcess/SearchList'
import styles from '../app/styles/styles.scss'
export const MainPage = () => {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <SearchList />
        <UploadManga />
      </main>
    </>
  )
}
