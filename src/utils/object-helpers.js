export const followUnfollowReducer = (state, action, boolean) => {
  return {
    ...state,
    users: state.users.map(u => {
      if (u.id === action.userId) {
        return { ...u, followed: boolean }
      }
      return u;
    })
  }
}