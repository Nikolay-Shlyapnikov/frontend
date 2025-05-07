import { SearchListProps, SearchManga } from '../../manga/store/types'

export type SearchSlice = {
  mangas: SearchManga[]
  filters: SearchListProps
}
