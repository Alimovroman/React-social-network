import { RootState } from "./redux-store";

export const getFindUsers = (state: RootState) => {
  return state.findUsers
};
export const getUsers = (state: RootState) => {
  return state.findUsers.users
}
export const getPageSize = (state: RootState) => {
  return state.findUsers.pageSize
}
export const getTotalUsersCount = (state: RootState) => {
  return state.findUsers.totalUsersCount
}
export const getCurrentPage = (state: RootState) => {
  return state.findUsers.currentPage
}
export const getIsFetching = (state: RootState) => {
  return state.findUsers.isFetching
}
export const getFollowedInProgress = (state: RootState) => {
  return state.findUsers.followedInProgress
}
