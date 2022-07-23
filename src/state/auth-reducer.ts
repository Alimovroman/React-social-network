import { stopSubmit } from "redux-form";
import { loginApi, securityApi } from "../api/api";
// import { AppDispatch } from "./redux-store";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const LOGOUT = 'auth/LOGOUT';
const GET_CAPTCHA_URL = `auth/GET_CAPTCHA_URL`;


let initialState: InitialStateType = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  rememberMe: false,
  captchaUrl: null
};

export type InitialStateType = {
  id: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean,
  rememberMe: boolean,
  captchaUrl: string | null
}

const authReducer = (state = initialState, action: any): InitialStateType => {
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
    case GET_CAPTCHA_URL:
      return {
        ...state,
        captchaUrl: action.captchaUrl
      }
    default:
      return state
  }
};

type SetAuthUserDataAction = {
  type: typeof SET_USER_DATA,
  data: {
    id: number,
    login: string,
    email: string
  }
};
type LogoutAction = { type: typeof LOGOUT };
type GetCaptchaUrlAction = {
  type: typeof GET_CAPTCHA_URL,
  captchaUrl: string
};

export const setAuthUserData = (id: number, login: string, email: string): SetAuthUserDataAction => ({ type: SET_USER_DATA, data: { id, login, email } });
const logout = (): LogoutAction => ({ type: LOGOUT });
export const getCaptchaUrl = (captchaUrl: string): GetCaptchaUrlAction => ({ type: GET_CAPTCHA_URL, captchaUrl })

export const setAuthUsersThunk = () => {
  return async (dispatch: any) => {
    let response = await loginApi.getLogin();
    if (response.data.resultCode === 0) {
      let { id, login, email } = response.data.data
      dispatch(setAuthUserData(id, login, email))
    }
  }
};
export const postLoginThunk = (email: string, password: number, rememberMe: boolean, captcha = null) => {
  return async (dispatch: any) => { // ЗАМЕНИТЬ НА ОБЫЧНУЮ АПДИСПАТЧ
    let response = await loginApi.postLogin(email, password, rememberMe, captcha);
    console.log(response.data.resultCode)
    if (response.data.resultCode === 0) {
      return dispatch(setAuthUsersThunk())
    } else {
      if (response.data.resultCode === 10) {
        dispatch(captchaUrlThunk())
      }
      let message = response.data.messages.length > 0 ? response.data.messages : 'Email Wrong';
      dispatch(stopSubmit('login', { _error: message }))
    }
  }
}
export const captchaUrlThunk = () => async (dispatch: any) => {
  let response = await securityApi.getCaptchaUrl();
  dispatch(getCaptchaUrl(response.data.url));
};

export const logoutThunk = () => {
  return async (dispatch: any) => {
    let response = await loginApi.logout();
    if (response.data.resultCode === 0) {
      dispatch(logout())
    }
  }
}

export default authReducer;