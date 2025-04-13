import React from 'react'
import { Page } from './Page'
import { UploadManga } from '../features/user/uploadManga/UploadManga'

export const ProfilePage = () => {
  return (
    <Page>
      <UploadManga />
    </Page>
  )
}
