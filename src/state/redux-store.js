import React from "react";
import { combineReducers, createStore } from "redux";
import findUserReducer from "../findUsers-reducer";
import authReducer from "./auth-reducer";
import messageReducer from "./message-reducer";
import profileReducer from "./profile-reducer";
import sideBarReducer from "./sideBar-reducer";

let reducers = combineReducers({
  profilePage: profileReducer,
  messagesPage: messageReducer,
  sideBar: sideBarReducer,
  findUsers: findUserReducer,
  auth: authReducer
});

const store = createStore(reducers);
window.store = store;

export default store;