import React, { useEffect, useState } from 'react'
import { fetch } from '../../../../utils/request/API'
import { ADDRESS_URL, PHOTO_URL } from '../../../../app/config'
import { store } from '../../../../utils/store/store'
import { InputFile } from '../../../../ui-lib/inputFile'
import { InputText } from '../../../../ui-lib/InputText'
import { Button } from '../../../../ui-lib/Button/inbex'
import { UploadMangaPhoto } from '../../../manga/store/types'
import { useAppDispatch, useAppSelector } from '../../../../utils/hooks/reduxHooks'
import { mangaSlice } from '../../../manga/store/store'
import styles from './UploadManga.scss'
import { Textarea } from '../../../../ui-lib/TextArea/ui'

export const UploadForm = () => {
	const dispatch = useAppDispatch()
	const uploadedPhotos = useAppSelector((state) => state.manga.uploadManga.photos)
	const [manga, setManga] = useState<{ name: string; description: string }>({
		name: '',
		description: '',
	})
	const [files, setFiles] = useState<FileList | null>(null)
	const [id, setId] = useState<string>('')
	const [error, setError] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const handleFileChange = (value: FileList | undefined | null) => {
		try {
			if (value) {
				if (uploadedPhotos.length) {
					uploadedPhotos.forEach((photos) => {
						URL.revokeObjectURL(photos.fileUrl)
					})
				}

				const photos: UploadMangaPhoto[] = []
				Array.from(value).forEach((file) => {
					// Проверка размера файла (например, максимум 5MB)
					if (file.size > 5 * 1024 * 1024) {
						throw new Error(
							`Файл ${file.name} слишком большой. Максимальный размер 5MB`,
						)
					}
					const fileUrl = URL.createObjectURL(file)
					photos.push({ fileName: file.name, fileUrl })
				})
				dispatch(mangaSlice.actions.setManga({ uploadManga: { photos } }))
				setFiles(value)
				setError('')
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Ошибка при загрузке файлов')
			setFiles(null)
		}
	}

	const handleInputChange = (value: string, key: 'name' | 'description') => {
		setManga({ ...manga, [key]: value })
		setError('')
	}

	const validateForm = () => {
		if (!files) {
			throw new Error('Пожалуйста, выберите файлы для загрузки')
		}
		if (!manga.name.trim()) {
			throw new Error('Пожалуйста, введите название')
		}
		if (!manga.description.trim()) {
			throw new Error('Пожалуйста, введите описание')
		}
	}

	const handleSubmit = async () => {
		try {
			setError('')
			setIsLoading(true)
			validateForm()

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
						throw new Error('Ошибка при создании манги')
					}
				},
			)
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Произошла ошибка при отправке формы')
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (files) {
			try {
				const filesArray = Array.from(files)
				const dataTransfer = new DataTransfer()
				uploadedPhotos.map((photo) => {
					const file = filesArray.find((file) => file.name === photo.fileName)
					if (file) {
						dataTransfer.items.add(file)
					}
				})
				setFiles(dataTransfer.files)
			} catch (error) {
				console.log(error)
				setError('Ошибка при обработке файлов')
			}
		}
	}, [uploadedPhotos])

	useEffect(() => {
		if (id && files) {
			const uploadPhotos = async () => {
				try {
					setIsLoading(true)
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
							if (!response.data) {
								throw new Error('Ошибка при загрузке фотографий')
							}
						},
					)
					setError('')
				} catch (err) {
					setError(err instanceof Error ? err.message : 'Ошибка при загрузке фотографий')
				} finally {
					setIsLoading(false)
				}
			}

			uploadPhotos()
		}
	}, [id])

	return (
		<div className={styles.form}>
			<InputFile
				classNames={{
					label: styles.inputFileLabel,
					inputWrapper: styles.inputFile,
				}}
				onChangeInput={handleFileChange}
				value={files}
			>
				{files?.length ? (
					<React.Fragment>
						<p>Выбрано файлов: {files.length}</p>
						<p>Перетащите сюда файлы, если хотите их змаенить</p>
					</React.Fragment>
				) : (
					'Перетащите сюда файлы'
				)}
			</InputFile>
			<InputText
				onChange={(value) => handleInputChange(value, 'name')}
				placeholder='Введите название'
				classNames={{ input: styles.input, inputWrapper: styles.inputWrapper }}
				value={manga.name}
				isDisabled={isLoading}
			/>
			<Textarea
				onChange={(value) => handleInputChange(value, 'description')}
				placeholder='Введите описание'
				value={manga.description}
				classNames={{
					textarea: styles.input,
					textareaWrapper: styles.inputWrapper,
				}}
				isDisabled={isLoading}
			/>
			{error && <div className={styles.error}>{error}</div>}
			<Button
				className={styles.button}
				onClick={handleSubmit}
				isDisabled={isLoading}
				isLoading={isLoading}
			>
				Отправить
			</Button>
		</div>
	)
}
