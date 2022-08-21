import { ColumnProps, PostProps, UserProps } from '@/interfaceAndTypeList/column'

interface ListProps<P> {
  [id: string]: P;
}

export interface GlobalErrorProps {
  status: boolean
  message?: string
}

export interface GlobalDataProps {
  error: GlobalErrorProps
  token: string
  loading: boolean
  columns: { data: ListProps<ColumnProps>; currentPage: number; total: number };
  posts: { data: ListProps<PostProps>; loadedColumns: string[] };
  user: UserProps
}

export interface ResponseType<P> {
  code: number
  msg: string
  data: P
}
