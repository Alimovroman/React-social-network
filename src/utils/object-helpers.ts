export const followUnfollowReducer = (state: any, action: any, boolean: any) => {
  return {
    ...state,
    users: state.users.map((u: any) => {
      if (u.id === action.userId) {
        return { ...u, followed: boolean }
      }
      return u;
    })
  }
}