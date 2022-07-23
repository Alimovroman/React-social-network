import { setAuthUsersThunk } from "./auth-reducer";
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

const appReducer = (state = initialState, action: any): InitialStateType => {
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

export const initializationAppThunk = () => (dispatch : any) => { // ЗАМЕНИТЬ НА ОБЫЧНУЮ АПДИСПАТЧ
  let promise = dispatch(setAuthUsersThunk());
  Promise.all([promise]).then(() => dispatch(initializationSuccess() )) // Promise.all([передаем массив промисов]) и после того как все массивы зарезолвятся то выполниться наш диспатч
};

export default appReducer;

// (alias) setAuthUsersThunk(): (dispatch: Dispatch<Action<any>>) => Promise<void>
//(alias) setAuthUsersThunk(): (dispatch: Dispatch<Action<any>>) => Promise<void>