import { setAuthUsersThunk } from "./auth-reducer";

const initialization_Success = 'APP/initialization_Success';

let initialState = {
  initialization: false
}

const appReducer = (state = initialState, action) => {
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

const initializationSuccess = () => ({type: initialization_Success});

export const initializationAppThunk = () => (dispatch) => {
  let promise = dispatch(setAuthUsersThunk());
  Promise.all([promise]).then(() => dispatch(initializationSuccess() )) // Promise.all([передаем массив промисов]) и после того как все массивы зарезолвятся то выполниться наш диспатч
};

export default appReducer;