import React, { useEffect, useState } from 'react'
import { fetch } from '../../../utils/request/API'
import { ADDRESS_URL, PHOTO_URL } from '../../../app/config'
import { store } from '../../../utils/store/store'
import { InputFile } from '../../../ui-lib/inputFile'
import { InputText } from '../../../ui-lib/InputText'
import { Button } from '../../../ui-lib/Button/inbex'

export const UploadManga = () => {
  const [manga, setManga] = useState<{ name: string; description: string }>({
    name: '',
    description: '',
  })
  const [files, setFiles] = useState<FileList | null>(null)
  const [id, setId] = useState<string>('')

  const handleFileChange = (value: FileList | undefined | null) => {
    if (value) {
      setFiles(value)
    }
  }

  const handleInputChange = (value: string, key: 'name' | 'description') => {
    setManga({ ...manga, [key]: value })
  }

  const handleSubmit = () => {
    if (files && manga.name && manga.description) {
      const { name, description } = manga
      fetch(
        'post',
        `${ADDRESS_URL}/manga`,
        {
          params: {
            name,
            description,
          },
          headers: {
            token: store.getState().user.token,
          },
        },
        (response) => {
          if (response.data) {
            setId(response.data.id)
          } else {
            console.error(response)
          }
        }
      )
    }
  }

  useEffect(() => {
    if (id && files) {
      const form = new FormData()
      form.set('id', id)
      Array.from(files).forEach((file, index) => form.set(`${index}`, file))
      fetch(
        'post',
        `${PHOTO_URL}/manga`,
        {
          params: form,
          headers: {
            token: store.getState().user.token,
          },
        },
        (response) => {
          if (response.data) {
            console.log({ response })
          } else {
            console.error(response)
          }
        }
      )
    }
  }, [id])

  return (
    <React.Fragment>
      <InputFile onChangeInput={handleFileChange} value={files}></InputFile>
      <InputText
        onChange={(value) => handleInputChange(value, 'name')}
        placeholder="Введите название"
        value={manga.name}
      />
      <InputText
        onChange={(value) => handleInputChange(value, 'description')}
        placeholder="Введите описание"
        value={manga.description}
      />
      <Button onClick={handleSubmit}>Отправить</Button>
    </React.Fragment>
  )
}
