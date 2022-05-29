import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import findUserReducer from "./findUsers-reducer";
import authReducer from "./auth-reducer";
import messageReducer from "./message-reducer";
import profileReducer from "./profile-reducer";
import sideBarReducer from "./sideBar-reducer";
import thunk from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";

let reducers = combineReducers({
  profilePage: profileReducer,
  messagesPage: messageReducer,
  sideBar: sideBarReducer,
  findUsers: findUserReducer,
  auth: authReducer,
  app: appReducer,
  form: formReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers( applyMiddleware(thunk) ));   

export default store;