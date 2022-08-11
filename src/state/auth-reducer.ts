import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { loginApi, ResultCodeEnum, securityApi } from "../api/api";
import { InferActionsType, RootState } from "./redux-store";
// import { AppDispatch } from "./redux-store";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const LOGOUT = 'auth/LOGOUT';
const GET_CAPTCHA_URL = `auth/GET_CAPTCHA_URL`;


let initialState = {
  id: null as (number | null),
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  rememberMe: false,
  captchaUrl: null as string | null
};

export type InitialStateType = typeof initialState

type ActionType = InferActionsType<typeof actionsAuth>

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

export const actionsAuth = {
  setAuthUserData : (id: number, login: string, email: string) => ({ type: SET_USER_DATA, data: { id, login, email } } as const),
  logout : () => ({ type: LOGOUT } as const),
  getCaptchaUrl : (captchaUrl: string) => ({ type: GET_CAPTCHA_URL, captchaUrl } as const)
}

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionType>

export const setAuthUsersThunk = (): ThunkType => {
  return async (dispatch) => {
    let response = await loginApi.getLogin();
    if (response.data.resultCode === ResultCodeEnum.Success) {
      let { id, login, email } = response.data.data
      dispatch(actionsAuth.setAuthUserData(id, login, email))
    }
  }
};
export const postLoginThunk = (email: string, password: string, rememberMe: boolean, captcha?: string | null): ThunkType => {
  return async (dispatch) => { 
    let response = await loginApi.postLogin(email, password, rememberMe, captcha);
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
  dispatch(actionsAuth.getCaptchaUrl(response.data.url));
};

export const logoutThunk = (): ThunkType => {
  return async (dispatch) => {
    let response = await loginApi.logout();
    if (response.data.resultCode === ResultCodeEnum.Success) {
      dispatch(actionsAuth.logout())
    }
  }
}

export default authReducer;