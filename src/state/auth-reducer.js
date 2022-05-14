import { loginApi } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';
const POST_LOGIN = 'POST_LOGIN';
const LOGOUT = 'LOGOUT';

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  rememberMe: false,
  logAuth: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data,
        isAuth: true
      }
    case POST_LOGIN:
      return {
        ...state,
        email: action.email,
        login: action.login,
        rememberMe: action.rememberMe,
        logAuth: true
      }
    case LOGOUT:
      return {
        ...state,
        email: null,
        login: null,
        logAuth: false
      }
    default:
      return state
  }
};

export const setAuthUserData = (id, login, email) => ({type: SET_USER_DATA, data: {id, login, email} });
const postLogin = (email, password) => ({type: POST_LOGIN, email, password});
const logout = () => ({type: LOGOUT})

export const setAuthUsersThunk = () => {
  return (dispatch) => {
    loginApi.getLogin().then(response => {
      if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data
        dispatch(setAuthUserData(id, login, email) )
      }
    })
  }
}
export const postLoginThuk = (email, password, rememberMe) => {
  return (dispatch) => {
    loginApi.postLogin(email, password, rememberMe).then(response => {
      dispatch(postLogin(email, password, rememberMe))
    })
  }
}

export const logoutThunk = () => {
  return (dispatch) => {
    loginApi.logout().then(response => {
      dispatch(logout())
    })
  }
}

export default authReducer;