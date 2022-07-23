export type UsersType = {
  id: number
  name: string
  uniqueUrlName: string | null
  photos: {
    small: string | null
    large: string | null
  }
  status: string
  followed: boolean
}