import { Action, applyMiddleware, combineReducers, compose, createStore } from "redux";
import findUserReducer from "./findUsers-reducer";
import authReducer from "./auth-reducer";
import messageReducer from "./message-reducer";
import profileReducer from "./profile-reducer";
import sideBarReducer from "./sideBar-reducer";
import thunk, { ThunkAction } from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";
import { useDispatch } from "react-redux";


let reducers = combineReducers({
  profilePage: profileReducer,
  messagesPage: messageReducer,
  sideBar: sideBarReducer,
  findUsers: findUserReducer,
  auth: authReducer,
  app: appReducer,
  form: formReducer
});

// type PropertiesTypes<T> = T extends {[key: string] : infer U} ? U : never
// export type InferActionsType<T extends {[key: string] : (...args :any[]) => any}> = ReturnType<PropertiesTypes<T>>
export type InferActionsType<T> = T extends {[key: string] : (...args :any[]) => infer U } ? U : never
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type BaseThunkType<A extends Action, R = void> = ThunkAction<R, RootState, unknown, A>
// export const useAppDispatch: () => AppDispatch = useDispatch

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers( applyMiddleware(thunk) ));   
export default store;