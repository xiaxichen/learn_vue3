import { ColumnProps, PostProps, UserProps } from '@/interfaceList/column'

export interface GlobalDataProps {
  columns: ColumnProps[],
  posts: PostProps[],
  user: UserProps
}
