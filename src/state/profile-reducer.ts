import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { profileApi, ResultCodeEnum } from "../api/api";
import { PhotosType, PostDataType, UserProfileType } from "../types/types";
import { RootState } from "./redux-store";

const ADD_POST = 'PROFILE_REDUCER/ADD-POST';
const DELETE_POST = 'PROFILE_REDUCER/DELETE_POST'
const SET_USER_PROFILE = 'PROFILE_REDUCER/SET_USER_PROFILE';
const SET_STATUS_PROFILE = 'PROFILE_REDUCER/SET_STATUS_PROFILE';
const PUT_PHOTOS_PROFILE = 'PROFILE_REDUCER/PUT_PHOTOS_PROFILE';
const PROFILE_SAVED = 'PROFILE_REDUCER/PROFILE_SAVED';



type InitialStateType = {
  postData: PostDataType[],
  userProfile: UserProfileType | null,
  status: string,
  photo: string | null,
  profileSaved: string | null
}

let initialState: InitialStateType = {
  postData: [
    { id: 1, message: 'Hi, how are you?', likeCount: '7' },
    { id: 2, message: 'Go to play in poker?', likeCount: '14' },
    { id: 3, message: 'Do you wont eat?', likeCount: '19' },
    { id: 4, message: 'yo yo yo', likeCount: '32' }
  ],
  userProfile: null,
  status: '',
  photo: null, //Возможно ненужно и ЭкшенКРеетор тоже
  profileSaved: null
};

type ActionType = AddPostActionCreatorType | DeletePostActionType | SetUserProfileActionType | 
  GetStatusProfileActionType | PutPhotoProfileActionType | profileSavedACType

const profileReducer = (state = initialState, action: ActionType): InitialStateType => {
  switch (action.type) {
    case ADD_POST:
      let newPost: PostDataType = {
        id: 5, message: action.postMessage, likeCount: '0'
      };
      return {
        ...state,
        postData: [...state.postData, newPost],
      };
    case DELETE_POST:
      return {
        ...state,
        postData: state.postData.filter(p => p.id !== action.userId)
      }
    case SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.userProfile
      };
    case SET_STATUS_PROFILE:
      return {
        ...state,
        status: action.status
      };
    case PUT_PHOTOS_PROFILE:
      return {
        ...state,
        userProfile: { ...state.userProfile, photos: action.photo } as UserProfileType
      };
    case PROFILE_SAVED:
      return {
        ...state,
        profileSaved: action.saved
      }
    default:
      return state
  }
};

type AddPostActionCreatorType = {
  type: typeof ADD_POST,
  postMessage: string
}
type DeletePostActionType = { 
  type: typeof DELETE_POST,
  userId: number
}
type SetUserProfileActionType = { 
  type: typeof SET_USER_PROFILE,
  userProfile: UserProfileType
}
type GetStatusProfileActionType = { 
  type: typeof SET_STATUS_PROFILE,
  status: string
}
type PutPhotoProfileActionType = { 
  type: typeof PUT_PHOTOS_PROFILE,
  photo: PhotosType
}
type profileSavedACType = {
  type: typeof PROFILE_SAVED,
  saved: string
}

export const addPostActionCreator = (text: string): AddPostActionCreatorType => ({ type: ADD_POST, postMessage: text });
export const deletePost = (userId: number): DeletePostActionType => ({ type: DELETE_POST, userId });
export const setUserProfile = (userProfile: UserProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, userProfile });
export const getStatusProfile = (status: string): GetStatusProfileActionType => ({ type: SET_STATUS_PROFILE, status });
export const putPhotoProfile = (photo: PhotosType): PutPhotoProfileActionType => ({ type: PUT_PHOTOS_PROFILE, photo });
export const profileSavedAC = (saved: string): profileSavedACType => ({ type: PROFILE_SAVED, saved })

type ThunkCreatorType = ThunkAction<Promise<void>, RootState, unknown, ActionType>

export const getProfileThunk = (userId: number): ThunkCreatorType => {
  return async (dispatch) => {
    let response = await profileApi.getProfile(userId);
    dispatch(setUserProfile(response));
  }
}
export const getStatusThunk = (userId: number): ThunkCreatorType => {
  return async (dispatch) => {
    let response = await profileApi.getStatus(userId);
    dispatch(getStatusProfile(response))
  }
}
export const putStatusThunk = (status: string): ThunkCreatorType => {
  return async (dispatch) => {
    let response = await profileApi.putStatus(status);
    if (response.data.resultCode === ResultCodeEnum.Success) {
      dispatch(getStatusProfile(status))
    }
  }
}
export const savePhoto = (photo: string | Blob): ThunkCreatorType => {
  return async (dispatch) => { // Нужно сюда задиспатчить Экшен и возможно сделать запрос
    let response = await profileApi.putPhoto(photo);
    if (response.data.resultCode === ResultCodeEnum.Success) {
      console.log(response)
      dispatch(putPhotoProfile(response.data.data.photos));
    }
  }
}
export const saveProfileInfo = (profileInfo: UserProfileType) => async (dispatch: any, getState: any) => { // Не понятно пока как делать тут
  const userId = getState().auth.id
  let response = await profileApi.putSaveProfileInfo(profileInfo);
  if (response.data.resultCode === 0) {
    dispatch(getProfileThunk(userId))
    return dispatch(profileSavedAC(`saved`))
  } else {

    //dispatch(stopSubmit('profileInfoData',{ 'contacts':{ 'website': response.data.messages  }}));
    dispatch(stopSubmit('profileInfoData', { _error: response.data.messages }))
    return dispatch(profileSavedAC(`notSaved`)) // Новый ЭкшенКриатор для выхода из сохранялки
    //return Promise.reject( response.data.messages)

  }
}

export default profileReducer;