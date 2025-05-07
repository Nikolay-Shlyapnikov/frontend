import React from 'react'
import { Page } from './Page'
import { UploadForm } from '../features/user/components/uploadManga/UploadForm'
import { PhotoList } from '../features/user/components/uploadManga/PhotoList'
import styles from '../features/user/components/uploadManga/UploadManga.scss'
import { ProfileHeader } from '../features/user/components/ProfileHeader/ProfileHeader'
import { ProfileTabSet } from '../features/user/components/ProfileModes/ProfileTabset'
import clsx from 'clsx'
import { useAppSelector } from '../utils/hooks/reduxHooks'
import { PROFILE_MODES } from '../features/user/components/ProfileModes/const'
import { SearchList } from '../features/search/components/SearchProcess/SearchList'

export const ProfilePage = () => {
  const profileMode = useAppSelector((state) => state.user.profileMode)
  return (
    <Page>
      <div className={clsx(styles.profileWrapper, styles.headerWrapper)}>
        <ProfileHeader />
        <ProfileTabSet />
      </div>
      {profileMode === PROFILE_MODES.UPLOAD_MANGA && (
        <React.Fragment>
          <h1 className={styles.profileWrapperTitle}>
            Здесь вы можете создать новую мангу или добавить главы к
            существующей
          </h1>
          <div className={clsx(styles.profileWrapper)}>
            <UploadForm />
            <PhotoList />
          </div>
        </React.Fragment>
      )}
      {profileMode === PROFILE_MODES.LIKES && (
        <React.Fragment>
          <h1 className={styles.profileWrapperTitle}>
            Понравившиеся Вам манги:
          </h1>
          <SearchList />
        </React.Fragment>
      )}
    </Page>
  )
}
