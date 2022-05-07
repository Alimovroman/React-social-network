import { userApi } from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USER_COUNT = 'SET_TOTAL_USER_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWED_IN_PROGRESS = 'TOGGLE_IS_FOLLOWED_IN_PROGRESS';

let initialState = {
  users: [],
  pageSize: 100,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followedInProgress: []
};

const findUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return { ...u, followed: true }
          }
          return u;
        })
      }
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return { ...u, followed: false }
          }
          return u;
        })
      }
    case SET_USERS:
      return { ...state, users: action.users }

    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage }

    case SET_TOTAL_USER_COUNT:
      return { ...state, totalUsersCount: action.totalUsersCount }

    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching }

    case TOGGLE_IS_FOLLOWED_IN_PROGRESS:
      return {
        ...state,
        followedInProgress: action.isFetching
          ? [...state.followedInProgress, action.id]
          : state.followedInProgress.filter(a => a != action.id)
      }

    default:
      return state
  }
};

export const followed = (userId) => ({ type: FOLLOW, userId });
export const unfollowed = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUserCount = (totalUsersCount) => ({ type: SET_TOTAL_USER_COUNT, totalUsersCount: totalUsersCount });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching: isFetching });
export const toggleIsFollowedInProgress = (id, isFetching) => ({ type: TOGGLE_IS_FOLLOWED_IN_PROGRESS, id, isFetching });

export const getUsersThunkCreator = (currentPage, pageSize) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage)) // Эта строка не требуется в ComponentDidMount
    userApi.getUsers(currentPage, pageSize).then(response => {
      dispatch(toggleIsFetching(false));
      dispatch(setUsers(response.items));
      dispatch(setTotalUserCount(response.totalCount));
    })
  };
}

export const unfollowThunkCreator = (userID) => {
  return (dispatch) => {
    dispatch(toggleIsFollowedInProgress(userID, true) )
    userApi.postFollowed(userID).then(response => {
      //if (response.data.resultCode == 0) {
        dispatch(unfollowed(userID) )
      //}
      dispatch(toggleIsFollowedInProgress(userID, false) )
    })
  }
}

export const followThunkCreator = (userId) => {
  return (dispatch) => {
    dispatch(toggleIsFollowedInProgress(userId, true) );
    userApi.deleteFollowed(userId).then(response => {
      //if (response.data.resultCode == 0) {
      dispatch(followed(userId) );
      // }
      dispatch(toggleIsFollowedInProgress(userId, false) )
    })
  }
}

export default findUserReducer;