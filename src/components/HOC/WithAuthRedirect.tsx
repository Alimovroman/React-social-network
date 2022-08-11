import React from "react";
import { connect } from "react-redux";
import { Navigate } from 'react-router-dom';
import { RootState } from "../../state/redux-store";

let mapStateToProps = (state: RootState) : MapStatePropsType => {
  return {
    loginIsAuth: state.auth.isAuth
  }
};

type MapStatePropsType = {
  loginIsAuth: boolean
}
type DispatchPropsType = {
}
function withAuthRedirect<WCP> (WrappedComponent: React.ComponentType<WCP>) {
  function RedirectComponent(props: MapStatePropsType & DispatchPropsType) {
     let {loginIsAuth, ...restProps} = props
      if (!loginIsAuth) return <Navigate to={'/auth'} />
      return <WrappedComponent {...restProps as unknown as WCP} />
    
  }

  let ConnectRedirectComponent = connect<MapStatePropsType,DispatchPropsType, WCP,RootState>(mapStateToProps, {})(RedirectComponent);
  return ConnectRedirectComponent
}

export default withAuthRedirect