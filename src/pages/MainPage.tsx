import React from 'react'

import { UploadManga } from '../features/user/uploadManga/UploadManga'
import { SearchList } from '../features/search/components/SearchProcess/SearchList'
import { Page } from './Page'

export const MainPage = () => {
  return (
    <Page>
      <SearchList />
      <UploadManga />
    </Page>
  )
}
