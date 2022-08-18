import { ColumnProps, PostProps, UserProps } from '@/interfaceList/column'

export interface GlobalDataProps {
  token: string
  loading: boolean,
  columns: ColumnProps[],
  posts: PostProps[],
  user: UserProps
}
