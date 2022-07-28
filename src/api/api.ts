import { UserProfileType } from './../types/types';
import { followed } from './../state/findUsers-reducer';
import axios from "axios";
import { PhotosType } from "../types/types";


const instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: { "API-KEY": "7192a1b6-ffa4-4fc2-aa28-2687d1e9c11e" },
  withCredentials: true
})

export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
  Captcha = 10
}

type GetLoginType= {
  data: {
    id: number
    email: string
    login: string
  }
  resultCode: ResultCodeEnum
  messages: string[]
}

type PostLoginType = {
  resultCode: ResultCodeEnum
  messages: string[]
  data: {
    userId: number
  }
}

type LogoutType = {
  resultCode: ResultCodeEnum
  messages: string[]
  data: object
}

export const loginApi = {
  getLogin: () => {
    return (
      instance.get<GetLoginType>(`auth/me`)
    )
  },
  postLogin: (email: string, password: string, rememberMe: boolean, captcha: string | null = null) => {
    return (
      instance.post<PostLoginType>(`auth/login`, {email, password, rememberMe, captcha})
    )
  },
  logout: () => {
    return (
      instance.delete<LogoutType>(`auth/login`)
    )
  }
}

type GetUsersType = {
  items: {
    name: string
    id: number
    photos: PhotosType
    status: string 
    followed: boolean
  }[]
  totalCount: number
  error: string
}

type FollowPost = {
  resultCode: ResultCodeEnum
  messages: string[],
  data: object
}

type FollowDelete = {
  resultCode: ResultCodeEnum
  messages: string[],
  data: object
}
export const userApi = {
  getUsers: (currentPage: number, pageSize: number) => {
    return (
      instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
    ).then(response => {
      return response.data
    })
  },
  postFollowed: (id: number) => {
    return instance.post<FollowPost>(`follow/${id}`)
  },
  deleteFollowed: (id: number) => {
    return instance.delete<FollowDelete>(`follow/${id}`)
  }
}

type GetProfileType = UserProfileType

type PutStatus = {
  resultCode: ResultCodeEnum
  messages: string[]
  data: object
}

type PutPhotoType = {
  resultCode: ResultCodeEnum
  messages: string[]
  data: PhotosType
}

type ProfileInfoType = {
  resultCode: ResultCodeEnum
  messages: string[],
  data: any
}

export const profileApi = {
  getProfile: (id: number) => {
    return instance.get<GetProfileType>(`/profile/${id}`).then(response => {
      return response.data
    })
  },
  getStatus: (id: number) => {
    return (
      instance.get<string>(`/profile/status/${id}`).then(response => (response.data))
    )
  },
  putStatus: (status: string) => {
    return (
      instance.put<PutStatus>(`/profile/status`,{status: status})
    )
  },
  putPhoto: (photo: string | Blob) => {
    let formData = new FormData();
    formData.append(`image`, photo)
    return instance.put(`/profile/photo`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
  },
  putSaveProfileInfo: (profileInfo: UserProfileType) => {
    return instance.put<ProfileInfoType>(`profile`, profileInfo)
  }
}

type GetCaptchaType = {url: string}

export const securityApi = {
  getCaptchaUrl: () => {
    return instance.get<GetCaptchaType>(`security/get-captcha-url`)
  }
}