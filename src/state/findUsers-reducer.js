import { userApi } from "../api/api";
import { followUnfollowReducer } from "../utils/object-helpers";

const FOLLOW = 'FIND-USER/FOLLOW';
const UNFOLLOW = 'FIND-USER/UNFOLLOW';
const SET_USERS = 'FIND-USER/SET_USERS';
const SET_CURRENT_PAGE = 'FIND-USER/SET_CURRENT_PAGE';
const SET_TOTAL_USER_COUNT = 'FIND-USER/SET_TOTAL_USER_COUNT';
const TOGGLE_IS_FETCHING = 'FIND-USER/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWED_IN_PROGRESS = 'FIND-USER/TOGGLE_IS_FOLLOWED_IN_PROGRESS';

let initialState = {
  users: [],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followedInProgress: [],
};

const findUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return followUnfollowReducer(state, action, true)
      
    case UNFOLLOW:
      return followUnfollowReducer(state, action, false)
      
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
          : state.followedInProgress.filter(a => a !== action.id)
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
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage)) // Эта строка не требуется в ComponentDidMount
    let response = await userApi.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(response.items));
    dispatch(setTotalUserCount(response.totalCount));
  };
}

const followUnfollowFlow = async (userId, apiMethod, action, dispatch) => {
    dispatch(toggleIsFollowedInProgress(userId, true));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
      dispatch(action(userId))
    }
    dispatch(toggleIsFollowedInProgress(userId, false))
}

export const unfollowThunkCreator = (userId) => {
  return async (dispatch) => {
    followUnfollowFlow(userId, userApi.deleteFollowed, unfollowed, dispatch);
  }
}

export const followThunkCreator = (userId) => { 
  return async (dispatch) => {
    followUnfollowFlow(userId, userApi.postFollowed, followed, dispatch)
  }
}

export default findUserReducer;