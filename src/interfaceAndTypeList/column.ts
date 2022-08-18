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
  _id: number
  title: string
  excerpt?: string
  content?: string
  image?: ImageProps
  createdAt: string
  column: string
}

export interface UserProps {
  isLogin: boolean
  nickName?: string
  _id?: number
  email?: string
  column?: string
}
