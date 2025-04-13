import React from 'react'
import styles from './Header.module.scss'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import { fetch } from '../../utils/request/API'
import { ADDRESS_URL } from '../../app/config'
import { Manga } from '../manga/store/types'
import { searchSlice } from '../search/store/searchSlice'
import { ColoredIcon } from '../../assets/ColoredIcon'
import SearchIcon from '../../assets/header/searchIcon.svg'
import UserIcon from '../../assets/header/user.svg'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

export const Header = () => {
  const dispatch = useAppDispatch()
  const token = useAppSelector((state) => state.user.token)

  const handleSearch = () => {
    fetch(
      'post',
      `${ADDRESS_URL}/search`,
      {
        params: { limit: 10, offset: 0 },
        headers: {
          token,
        },
      },
      (response) => {
        if (response.data) {
          if (response.data && response.data.length > 0) {
            const mangas = response.data as unknown as Manga[]
            console.log({ mangas })
            dispatch(searchSlice.actions.setSearch({ mangas }))
          }
        } else {
          console.error(response)
        }
      }
    )
  }

  return (
    <div className={styles.header}>
      <div className={clsx(styles.container, styles.headerWrapper)}>
        <div className={styles.headerLogo}>
          <Link className={styles.headerLogo} to={'/'}>
            X-hub
          </Link>
        </div>
        <div className={styles.headerSearchWrapper}>
          <input
            className={styles.headerSearchField}
            type="text"
            placeholder="Поиск"
          />
          <button className={styles.headerButton} onClick={handleSearch}>
            <ColoredIcon icon={SearchIcon} color="#ff4656" />
          </button>
        </div>
        <Link to={token ? '/profile' : '/login'}>
          <ColoredIcon
            icon={UserIcon}
            color="#ff4656"
            className={styles.headerButton}
          />
        </Link>
      </div>
    </div>
  )
}
