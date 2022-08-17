import { ColumnProps, PostProps, UserProps } from '@/interfaceList/column'

export interface GlobalDataProps {
  loading: boolean,
  columns: ColumnProps[],
  posts: PostProps[],
  user: UserProps
}
