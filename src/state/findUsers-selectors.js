export const getFindUsers = (state) => {
  return state.findUsers
};
export const getUsers = (state) => {
  return state.findUsers.users
}
export const getPageSize = (state) => {
  return state.findUsers.pageSize
}
export const getTotalUsersCount = (state) => {
  return state.findUsers.totalUsersCount
}
export const getCurrentPage = (state) => {
  return state.findUsers.currentPage
}
export const getIsFetching = (state) => {
  return state.findUsers.isFetching
}
export const getFollowedInProgress = (state) => {
  return state.findUsers.followedInProgress
}
