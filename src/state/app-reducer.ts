import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { setAuthUsersThunk } from "./auth-reducer";
import { InferActionsType, RootState } from "./redux-store";

type InitialStateType = typeof initialState

let initialState = {
  initialization: false
}

type ActionType = InferActionsType<typeof actionsApp>

const appReducer = (state = initialState, action: ActionType): InitialStateType => {
  switch(action.type) {
    case "APP/INITIALIZATION_SUCCESS":
      return {
        ...state,
        initialization: true
      }

    default:
      return state
  }
};

export const actionsApp = {
  initializationSuccess : () => ({type: 'APP/INITIALIZATION_SUCCESS'} as const)
}


export const initializationAppThunk = (): ThunkAction<void, RootState, unknown, ActionType> => (dispatch) => { // ЗАМЕНИТЬ НА ОБЫЧНУЮ АПДИСПАТЧ
  let promise = dispatch(setAuthUsersThunk());
  Promise.all([promise]).then(() => dispatch(actionsApp.initializationSuccess() )) // Promise.all([передаем массив промисов]) и после того как все массивы зарезолвятся то выполниться наш диспатч
};

export default appReducer;
