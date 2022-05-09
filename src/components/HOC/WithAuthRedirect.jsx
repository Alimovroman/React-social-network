import React from "react";
import { connect } from "react-redux";
import { Navigate } from 'react-router-dom';

let mapStateToProps = (state) => {
  return {
    loginIsAuth: state.auth.isAuth
  }
};

const withAuthRedirect = (WrappedComponent) => {
  class RedirectComponent extends React.Component {
    render() {
      if (!this.props.loginIsAuth) return <Navigate to={'/auth'} />
      return <WrappedComponent {...this.props} />
    }
  }

  let ConnectRedirectComponent = connect(mapStateToProps, {})(RedirectComponent);
  return ConnectRedirectComponent
}

export default withAuthRedirect