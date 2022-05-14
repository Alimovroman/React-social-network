import axios from "axios"

const instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: { "API-KEY": "7192a1b6-ffa4-4fc2-aa28-2687d1e9c11e" },
  withCredentials: true
})

export const loginApi = {
  getLogin: () => {
    return (
      instance.get(`auth/me`)
    )
  },
  postLogin: (email, password, rememberMe) => {
    return (
      instance.post(`auth/login`, {email, password, rememberMe})
    )
  },
  logout: () => {
    return (
      instance.delete(`auth/login`)
    )
  }
}

export const userApi = {
  getUsers: (currentPage, pageSize) => {
    return (
      instance.get(`users?page=${currentPage}&count=${pageSize}`)
    ).then(response => {
      return response.data
    })
  },
  postFollowed: (id) => {
    return instance.post(`follow/${id}`)
  },
  deleteFollowed: (id) => {
    return instance.delete(`follow/${id}`)
  }
}

export const profileApi = {
  getProfile: (id) => {
    return instance.get(`/profile/${id}`).then(response => {
      return response.data
    })
  },
  getStatus: (id) => {
    return (
      instance.get(`/profile/status/${id}`).then(response => (response.data))
    )
  },
  putStatus: (status) => {
    return (
      instance.put(`/profile/status`,{status: status}).then(response => {
        return response.data})
    )
  }
}

