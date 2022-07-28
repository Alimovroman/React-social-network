import { ResultCodeEnum } from './../api/api';
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { userApi } from "../api/api";
import { UsersType } from "../types/types";
import { followUnfollowReducer } from "../utils/object-helpers";
import { RootState } from "./redux-store";

const FOLLOW = 'FIND-USER/FOLLOW';
const UNFOLLOW = 'FIND-USER/UNFOLLOW';
const SET_USERS = 'FIND-USER/SET_USERS';
const SET_CURRENT_PAGE = 'FIND-USER/SET_CURRENT_PAGE';
const SET_TOTAL_USER_COUNT = 'FIND-USER/SET_TOTAL_USER_COUNT';
const TOGGLE_IS_FETCHING = 'FIND-USER/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWED_IN_PROGRESS = 'FIND-USER/TOGGLE_IS_FOLLOWED_IN_PROGRESS';



export type InitialStateTypeForFindUsers = {
  users: UsersType[],
  pageSize: number,
  totalUsersCount: number,
  currentPage: number,
  isFetching: boolean,
  followedInProgress: number[], // Array of users id
}
let initialState: InitialStateTypeForFindUsers = {
  users: [],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followedInProgress: [],
};

type ActionType = FollowedActionType | UnfollowedActionType | SetUsersActionType | SetCurrentPageActionType |
  SetTotalUserCountActionType | ToggleIsFetchingActionType | ToggleIsFollowedInProgressActionType

const findUserReducer = (state = initialState, action: ActionType): InitialStateTypeForFindUsers => {
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
          : state.followedInProgress.filter((a: number) => a !== action.id)
      }

    default:
      return state
  }
};

type FollowedActionType = {
  type: typeof FOLLOW,
  userId: number
}
type UnfollowedActionType = {
  type: typeof UNFOLLOW,
  userId: number
}
type SetUsersActionType = {
  type: typeof SET_USERS,
  users: UsersType[]
}
type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE,
  currentPage: number
}
type SetTotalUserCountActionType = {
  type: typeof SET_TOTAL_USER_COUNT,
  totalUsersCount: number
}
type ToggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING,
  isFetching: boolean
}
type ToggleIsFollowedInProgressActionType = {
  type: typeof TOGGLE_IS_FOLLOWED_IN_PROGRESS,
  id: number,
  isFetching: boolean
}

export const followed = (userId: number): FollowedActionType => ({ type: FOLLOW, userId });
export const unfollowed = (userId: number): UnfollowedActionType => ({ type: UNFOLLOW, userId });
export const setUsers = (users: UsersType[]): SetUsersActionType => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUserCount = (totalUsersCount: number): SetTotalUserCountActionType => ({ type: SET_TOTAL_USER_COUNT, totalUsersCount: totalUsersCount });
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching: isFetching });
export const toggleIsFollowedInProgress = (id: number, isFetching: boolean): ToggleIsFollowedInProgressActionType => ({ type: TOGGLE_IS_FOLLOWED_IN_PROGRESS, id, isFetching });

type ThunkCreatorType = ThunkAction<Promise<void>, RootState, unknown, ActionType>

export const getUsersThunkCreator = (currentPage: number, pageSize: number): ThunkCreatorType => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage)) // Эта строка не требуется в ComponentDidMount
    let response = await userApi.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(response.items));
    dispatch(setTotalUserCount(response.totalCount));
  };
}

const _followUnfollowFlow = async (userId: number,
                                    apiMethod: any,
                                    action: (userId: number) =>  UnfollowedActionType | FollowedActionType,
                                    dispatch: Dispatch<ActionType>) => {
  dispatch(toggleIsFollowedInProgress(userId, true));
  let response = await apiMethod(userId);
  if (response.data.resultCode === ResultCodeEnum.Success) {
    dispatch(action(userId))
  }
  dispatch(toggleIsFollowedInProgress(userId, false))
}

export const unfollowThunkCreator = (userId: number): ThunkCreatorType => {
  return async (dispatch) => {
    _followUnfollowFlow(userId, userApi.deleteFollowed, unfollowed, dispatch);
  }
}

export const followThunkCreator = (userId: number): ThunkCreatorType => {
  return async (dispatch) => {
    _followUnfollowFlow(userId, userApi.postFollowed, followed, dispatch)
  }
}

export default findUserReducer;