import * as axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { setAuthUserData } from "../../state/auth-reducer";
import Header from "./Header";


class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`,
      { withCredentials: true })
      .then(response => {
        if (response.data.resultCode === 0) {
          let {id, login, email} = response.data.data
          this.props.setAuthUserData(id, login, email)
        }
      })
  }
  render() {
    return (
      <Header isAuth={this.props.isAuth} login={this.props.login}/>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    login: state.auth.login,
    isAuth: state.auth.isAuth
  }
};

export default connect(mapStateToProps, { setAuthUserData })(HeaderContainer);
//export default HeaderContainer;