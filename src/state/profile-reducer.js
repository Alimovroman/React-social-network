import { stopSubmit } from "redux-form";
import { profileApi } from "../api/api";

const ADD_POST = 'PROFILE_REDUCER/ADD-POST';
const DELETE_POST = 'PROFILE_REDUCER/DELETE_POST'
const SET_USER_PROFILE = 'PROFILE_REDUCER/SET_USER_PROFILE';
const SET_STATUS_PROFILE = 'PROFILE_REDUCER/SET_STATUS_PROFILE';
const PUT_PHOTOS_PROFILE = 'PROFILE_REDUCER/PUT_PHOTOS_PROFILE';
const PROFILE_SAVED = 'PROFILE_REDUCER/PROFILE_SAVED';

let initialState = {
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

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 5, message: action.postMessage, likeCount: 0
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
        userProfile: { ...state.userProfile, photos: action.photo }
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

export const addPostActionCreator = (text) => ({ type: ADD_POST, postMessage: text });
export const deletePost = (userId) => ({ type: DELETE_POST, userId });
export const setUserProfile = (userProfile) => ({ type: SET_USER_PROFILE, userProfile });
export const getStatusProfile = (status) => ({ type: SET_STATUS_PROFILE, status });
export const putPhotoProfile = (photo) => ({ type: PUT_PHOTOS_PROFILE, photo });
export const profileSavedAC = (saved) => ({ type: PROFILE_SAVED, saved })


export const getProfileThunk = (userId) => {
  return async (dispatch) => {
    let response = await profileApi.getProfile(userId);
    dispatch(setUserProfile(response));
  }
}
export const getStatusThunk = (userId) => {
  return async (dispatch) => {
    let response = await profileApi.getStatus(userId);
    dispatch(getStatusProfile(response))
  }
}
export const putStatusThunk = (status) => {
  return async (dispatch) => {
    let response = await profileApi.putStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(getStatusProfile(status))
    }
  }
}
export const savePhoto = (photo) => {
  return async (dispatch) => { // Нужно сюда задиспатчить Экшен и возможно сделать запрос
    let response = await profileApi.putPhoto(photo);
    if (response.data.resultCode === 0) {
      dispatch(putPhotoProfile(response.data.data.photos));
    }
  }
}
export const saveProfileInfo = (profileInfo) => async (dispatch, getState) => {
  const userId = getState().auth.id
  let response = await profileApi.putSaveProfileInfo(profileInfo);
  if (response.data.resultCode === 0) {
    dispatch(getProfileThunk(userId))
    return dispatch(profileSavedAC(`saved`))
  } else {
    
    //dispatch(stopSubmit('profileInfoData',{ 'contacts':{ 'website': response.data.messages  }}));
    dispatch(stopSubmit('profileInfoData', {_error: response.data.messages  }))
    return dispatch(profileSavedAC(`notSaved`)) // Новый ЭкшенКриатор для выхода из сохранялки
    //return Promise.reject( response.data.messages)

  }
}

export default profileReducer;