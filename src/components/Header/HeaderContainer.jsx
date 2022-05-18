import React from "react";
import { connect } from "react-redux";
import { logoutThunk } from "../../state/auth-reducer";
import Header from "./Header";


class HeaderContainer extends React.Component {
  constructor(props) {
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

const mapStateToProps = (state) => {
  return {
    login: state.auth.login,
    isAuth: state.auth.isAuth
  }
};

export default connect(mapStateToProps, { logoutThunk })(HeaderContainer);