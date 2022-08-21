export interface ImageProps {
  _id?: string
  url?: string
  createdAt?: string
}

export interface ColumnProps {
  _id: number
  title: string
  author: string
  avatar: ImageProps
  createdAt: string
  description: string
}

export interface PostProps {
  _id?: number
  title: string
  excerpt?: string
  content?: string
  image?: ImageProps | string
  createdAt?: string
  column: string
  author: string
}

export interface UserProps {
  isLogin: boolean
  nickName?: string
  _id?: string
  email?: string
  column?: string
}
