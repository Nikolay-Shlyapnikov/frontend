export interface SearchManga {
  id: string
  name: string
  description: string
  preview_id: string
}

export interface Manga extends SearchManga {
  page_list: string[]
  created_at: string
  preview_src: string
  isLoading: boolean
}

export type MangaSlice = Manga & {
  uploadManga: {
    photos: UploadMangaPhoto[]
  }
}

export type UploadMangaPhoto = {
  fileName: string
  fileUrl: string
}
