import { stopSubmit } from "redux-form";
import { loginApi } from "../api/api";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const LOGOUT = 'auth/LOGOUT';

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  rememberMe: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data,
        isAuth: true
      }
    case LOGOUT:
      return {
        ...state,
        email: null,
        login: null,
        rememberMe: false,
        isAuth: false,
      }
    default:
      return state
  }
};

export const setAuthUserData = (id, login, email) => ({ type: SET_USER_DATA, data: { id, login, email } });
const logout = () => ({ type: LOGOUT })

export const setAuthUsersThunk = () => {
  return async (dispatch) => {
    let response = await loginApi.getLogin();
    if (response.data.resultCode === 0) {
      let { id, login, email } = response.data.data
      dispatch(setAuthUserData(id, login, email))
    }
  }
};
export const postLoginThuk = (email, password, rememberMe) => {
  return async (dispatch) => {
    let response = await loginApi.postLogin(email, password, rememberMe); 
      console.log(response.data.resultCode)
      if (response.data.resultCode === 0) {
        return dispatch(setAuthUsersThunk())
      } else {
        let message = response.data.messages.length > 0 ? response.data.messages : 'Email Wrong';
        dispatch(stopSubmit('login', { _error: message }))
      }
  }
}

export const logoutThunk = () => {
  return async (dispatch) => {
    let response = await loginApi.logout();
      if (response.data.resultCode === 0) {
        dispatch(logout())
      }
  }
}

export default authReducer;