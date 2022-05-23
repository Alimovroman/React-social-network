import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { reduxForm } from "redux-form";
import { postLoginThuk } from "../../state/auth-reducer";
import { required } from "../../utils/validator";
import { createField, Input } from "../common/Preloader/FormControl";
import classes from './Login.module.css'

let LoginForm = ({handleSubmit, error}) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField('text', 'email', 'email', Input, required)}
      {createField('password', 'password', 'Password', Input, required)}
      {createField('checkbox', 'checkbox', null, Input, null, 'Remember me')}
      {error
        ? <div className={classes.error}>{error}</div>
        : null}
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}

LoginForm = reduxForm({ form: 'login' })(LoginForm)

const Login = ({postLoginThuk, isAuth}) => {
  const onSubmit = (formData) => {
    postLoginThuk(formData.email, formData.password, formData.checkbox)
  }
  if (isAuth) {
    return <Navigate to={'/profile'} />
  }
  return (
    <div>
      <h2>Login</h2>
      <LoginForm onSubmit={onSubmit} />
    </div>
  )
};

let mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
});


export default connect(mapStateToProps, { postLoginThuk })(Login);