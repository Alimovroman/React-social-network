import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { loginApi, ResultCodeEnum, securityApi } from "../api/api";
import { RootState } from "./redux-store";
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

type ActionType = SetAuthUserDataAction | LogoutAction | GetCaptchaUrlAction

const authReducer = (state = initialState, action: ActionType): InitialStateType => {
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

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionType>

export const setAuthUsersThunk = (): ThunkType => {
  return async (dispatch) => {
    let response = await loginApi.getLogin();
    if (response.data.resultCode === ResultCodeEnum.Success) {
      let { id, login, email } = response.data.data
      dispatch(setAuthUserData(id, login, email))
    }
  }
};
export const postLoginThunk = (email: string, password: string, rememberMe: boolean, captcha?: string | null): ThunkType => {
  return async (dispatch) => { // ЗАМЕНИТЬ НА ОБЫЧНУЮ АПДИСПАТЧ
    let response = await loginApi.postLogin(email, password, rememberMe, captcha);
    console.log(response.data.resultCode)
    if (response.data.resultCode === ResultCodeEnum.Success) {
       dispatch(setAuthUsersThunk())
    } else {
      if (response.data.resultCode === ResultCodeEnum.Captcha) {
        dispatch(captchaUrlThunk())
      }
      let message = response.data.messages.length > 0 ? response.data.messages : 'Email Wrong';
      dispatch(stopSubmit('login', { _error: message }))
    }
  }
}
export const captchaUrlThunk = (): ThunkType => async (dispatch) => {
  let response = await securityApi.getCaptchaUrl();
  dispatch(getCaptchaUrl(response.data.url));
};

export const logoutThunk = (): ThunkType => {
  return async (dispatch) => {
    let response = await loginApi.logout();
    if (response.data.resultCode === ResultCodeEnum.Success) {
      dispatch(logout())
    }
  }
}

export default authReducer;