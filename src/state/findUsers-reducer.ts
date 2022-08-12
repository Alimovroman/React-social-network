import { ResultCodeEnum } from './../api/api';
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { userApi } from "../api/api";
import { UsersType } from "../types/types";
import { followUnfollowReducer } from "../utils/object-helpers";
import { InferActionsType, RootState } from "./redux-store";

export type InitialStateTypeForFindUsers = typeof initialState
let initialState = {
  users: [] as UsersType[],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followedInProgress: [] as number[],
  filter: {
    term: '',
    friend: null as null | boolean
  }
};



const findUserReducer = (state = initialState, action: ActionType): InitialStateTypeForFindUsers => {
  switch (action.type) {
    case 'FIND-USER/FOLLOW':
      return followUnfollowReducer(state, action, true)

    case 'FIND-USER/UNFOLLOW':
      return followUnfollowReducer(state, action, false)

    case 'FIND-USER/SET_USERS':
      return { ...state, users: action.users }

    case 'FIND-USER/SET_CURRENT_PAGE':
      return { ...state, currentPage: action.currentPage }

    case 'FIND-USER/SET_TOTAL_USER_COUNT':
      return { ...state, totalUsersCount: action.totalUsersCount }

    case 'FIND-USER/TOGGLE_IS_FETCHING':
      return { ...state, isFetching: action.isFetching }

    case 'FIND-USER/TOGGLE_IS_FOLLOWED_IN_PROGRESS':
      return {
        ...state,
        followedInProgress: action.isFetching
          ? [...state.followedInProgress, action.id]
          : state.followedInProgress.filter((a: number) => a !== action.id)
      }
    case 'FIND-USER/SEARCH_USERS':
      return {
        ...state,
        filter: action.payload
      }


    default:
      return state
  }
};

type ActionType = InferActionsType<typeof actionsFindUsers>

export const actionsFindUsers = {
  followed: (userId: number) => ({ type: 'FIND-USER/FOLLOW', userId } as const),
  unfollowed: (userId: number) => ({ type: 'FIND-USER/UNFOLLOW', userId } as const),
  setUsers: (users: UsersType[]) => ({ type: 'FIND-USER/SET_USERS', users } as const),
  setCurrentPage: (currentPage: number) => ({ type: 'FIND-USER/SET_CURRENT_PAGE', currentPage } as const),
  setTotalUserCount: (totalUsersCount: number) => ({ type: 'FIND-USER/SET_TOTAL_USER_COUNT', totalUsersCount: totalUsersCount } as const),
  toggleIsFetching: (isFetching: boolean) => ({ type: 'FIND-USER/TOGGLE_IS_FETCHING', isFetching: isFetching } as const),
  toggleIsFollowedInProgress: (id: number, isFetching: boolean) => ({ type: 'FIND-USER/TOGGLE_IS_FOLLOWED_IN_PROGRESS', id, isFetching } as const),
  searchUsers: (filter: FilterUsers) => ({type: 'FIND-USER/SEARCH_USERS', payload: filter } as const)
}

type ThunkCreatorType = ThunkAction<Promise<void>, RootState, unknown, ActionType>

export const getUsersThunkCreator = (currentPage: number, pageSize: number, filter: FilterUsers): ThunkCreatorType => {
  return async (dispatch) => {
    dispatch(actionsFindUsers.toggleIsFetching(true));
    dispatch(actionsFindUsers.setCurrentPage(currentPage)) // Эта строка не требуется в ComponentDidMount
    dispatch(actionsFindUsers.searchUsers(filter))

    let response = await userApi.getUsers(currentPage, pageSize, filter.term, filter.friend);
    dispatch(actionsFindUsers.toggleIsFetching(false));
    dispatch(actionsFindUsers.setUsers(response.items));
    dispatch(actionsFindUsers.setTotalUserCount(response.totalCount));
    
  };
}

const _followUnfollowFlow = async (userId: number,
  apiMethod: any,
  action: (userId: number) => ActionType,
  dispatch: Dispatch<ActionType>) => {
  dispatch(actionsFindUsers.toggleIsFollowedInProgress(userId, true));
  let response = await apiMethod(userId);
  if (response.data.resultCode === ResultCodeEnum.Success) {
    dispatch(action(userId))
  }
  dispatch(actionsFindUsers.toggleIsFollowedInProgress(userId, false))
}

export const unfollowThunkCreator = (userId: number): ThunkCreatorType => {
  return async (dispatch) => {
    await _followUnfollowFlow(userId, userApi.deleteFollowed, actionsFindUsers.unfollowed, dispatch);
  }
}

export const followThunkCreator = (userId: number): ThunkCreatorType => {
  return async (dispatch) => {
    await _followUnfollowFlow(userId, userApi.postFollowed, actionsFindUsers.followed, dispatch)
  }
}

export type FilterUsers = typeof initialState.filter
export default findUserReducer;