import React from "react";
import { connect } from "react-redux";
import { setAuthUsersThunk } from "../../state/auth-reducer";
import Header from "./Header";


class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.setAuthUsersThunk();
  }
  render() {
    return (
      <Header isAuth={this.props.isAuth} login={this.props.login} />
    )
  }
};

const mapStateToProps = (state) => {
  return {
    login: state.auth.login,
    isAuth: state.auth.isAuth
  }
};

export default connect(mapStateToProps, { setAuthUsersThunk })(HeaderContainer);