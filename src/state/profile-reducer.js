import { profileApi } from "../api/api";

const ADD_POST = 'PROFILE_REDUCER/ADD-POST';
const DELETE_POST = 'PROFILE_REDUCER/DELETE_POST'
const SET_USER_PROFILE = 'PROFILE_REDUCER/SET_USER_PROFILE';
const SET_STATUS_PROFILE = 'PROFILE_REDUCER/SET_STATUS_PROFILE';

let initialState = {
  postData: [
    { id: 1, message: 'Hi, how are you?', likeCount: '7' },
    { id: 2, message: 'Go to play in poker?', likeCount: '14' },
    { id: 3, message: 'Do you wont eat?', likeCount: '19' },
    { id: 4, message: 'yo yo yo', likeCount: '32' }
  ],
  userProfile: null,
  status: ''
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

    default:
      return state
  }
};

export const addPostActionCreator = (text) => ({ type: ADD_POST, postMessage: text });
export const deletePost = (userId) => ({type: DELETE_POST, userId})
export const setUserProfile = (userProfile) => ({ type: SET_USER_PROFILE, userProfile });
export const getStatusProfile = (status) => ({ type: SET_STATUS_PROFILE, status })


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
      if (response.resultCode === 0) {
        dispatch(getStatusProfile(response))
      }
  }
}
export default profileReducer;