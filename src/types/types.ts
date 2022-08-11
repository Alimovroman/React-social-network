export type UsersType = {
  id: number
  name: string
  photos: PhotosType
  status: string
  followed: boolean
}

export type PhotosType = {
  small: string | null,
  large: string | null
}

export type ContactsType = {
  facebook: string 
  website: string 
  vk: string 
  twitter: string 
  instagram: string 
  youtube: string 
  github: string 
  mainLink: string 
}

export type UserProfileType = {
  aboutMe?: string,
  contacts: ContactsType
  lookingForAJob: boolean,
  lookingForAJobDescription?: string,
  fullName: string,
  userId: number,
  photos: PhotosType
}
export type PostDataType = {
  id: number,
  message: string,
  likeCount: string
}