import React from "react";
import { connect } from "react-redux";
import { logoutThunk } from "../../state/auth-reducer";
import { RootState } from "../../state/redux-store";
import Header from "./Header";

type PropsType = {
  isAuth: boolean
  login: string | null
  logoutThunk: () => void
}

class HeaderContainer extends React.Component<PropsType> {
  constructor(props: PropsType) {
    super(props);
    this.onLogout = this.onLogout.bind(this)
  }
  onLogout() {
    this.props.logoutThunk()
  }
  render() {
    return (
      <Header isAuth={this.props.isAuth} login={this.props.login} onLogout={this.onLogout}/>
    )
  }
};

const mapStateToProps = (state: RootState) => {
  return {
    login: state.auth.login,
    isAuth: state.auth.isAuth
  }
};

export default connect(mapStateToProps, { logoutThunk })(HeaderContainer);