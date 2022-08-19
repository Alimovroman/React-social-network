import React from "react";
import { useDispatch } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { logoutThunk } from "../../state/auth-reducer";
import { RootState } from "../../state/redux-store";
import Header from "./Header";

type PropsType = {
  isAuth: boolean
  login: string | null
  logoutThunk: () => void
}

const HeaderContainer = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, Action>>()

  const onLogout = () => {
    dispatch(logoutThunk())
  }
    return (
      <Header />
    )
};

export default HeaderContainer;