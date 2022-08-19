import { ColumnProps, PostProps, UserProps } from '@/interfaceAndTypeList/column'

export interface GlobalErrorProps {
  status: boolean
  message?: string
}

export interface GlobalDataProps {
  error: GlobalErrorProps
  token: string
  loading: boolean
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}

export interface ResponseType<P> {
  code: number
  msg: string
  data: P
}
