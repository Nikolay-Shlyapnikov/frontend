import React from 'react'

import { InSearch } from '../features/search/components/SearchProcess/InSearch'
import { UploadManga } from '../features/user/uploadManga/UploadManga'

export const MainPage = () => {
  return (
    <>
      <div>
        <InSearch />
        <UploadManga />
      </div>
      <div></div>
    </>
  )
}
