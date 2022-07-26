import React from "react";
import { connect } from "react-redux";
import { Navigate } from 'react-router-dom';
import { RootState } from "../../state/redux-store";

let mapStateToProps = (state: RootState) => {
  return {
    loginIsAuth: state.auth.isAuth
  }
};

type PropsType = {
  loginIsAuth: boolean
}

const withAuthRedirect = (WrappedComponent: any) => {
  class RedirectComponent extends React.Component<PropsType> {
    render() {
      if (!this.props.loginIsAuth) return <Navigate to={'/auth'} />
      return <WrappedComponent {...this.props} />
    }
  }

  let ConnectRedirectComponent = connect(mapStateToProps, {})(RedirectComponent);
  return ConnectRedirectComponent
}

export default withAuthRedirect