import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { setAuthUsersThunk } from "./auth-reducer";
import { RootState } from "./redux-store";
// import { AppDispatch } from "./redux-store";

const initialization_Success = 'APP/initialization_Success';

type InitialStateType = {
  initialization: boolean
}
let initialState: InitialStateType = {
  initialization: false
}

type InitializationSuccessAction = {
  type: typeof initialization_Success
}

type ActionType = InitializationSuccessAction

const appReducer = (state = initialState, action: ActionType): InitialStateType => {
  switch(action.type) {
    case initialization_Success:
      return {
        ...state,
        initialization: true
      }

    default:
      return state
  }
};

const initializationSuccess = (): InitializationSuccessAction => ({type: initialization_Success});

export const initializationAppThunk = (): ThunkAction<void, RootState, unknown, ActionType> => (dispatch) => { // ЗАМЕНИТЬ НА ОБЫЧНУЮ АПДИСПАТЧ
  let promise = dispatch(setAuthUsersThunk());
  Promise.all([promise]).then(() => dispatch(initializationSuccess() )) // Promise.all([передаем массив промисов]) и после того как все массивы зарезолвятся то выполниться наш диспатч
};

export default appReducer;

// (alias) setAuthUsersThunk(): (dispatch: Dispatch<Action<any>>) => Promise<void>
//(alias) setAuthUsersThunk(): (dispatch: Dispatch<Action<any>>) => Promise<void>