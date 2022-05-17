import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { Field } from "redux-form";
import { reduxForm } from "redux-form";
import { postLoginThuk } from "../../state/auth-reducer";
import { required } from "../../utils/validator";
import { Input } from "../common/Preloader/FormControl";
import classes from './Login.module.css'

let LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field type='text' name='email' placeholder="email" component={Input} validate={required} />
      </div>
      <div>
        <Field type='password' name='password' placeholder='Password' component={Input} validate={required} />
      </div>
      <div>
        <Field type='checkbox' name='checkbox' component={Input} />Remember me
      </div>
      {props.error
        ? <div className={classes.error}>{props.error}</div>
        : null}
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}

LoginForm = reduxForm({ form: 'login' })(LoginForm)

const Login = (props) => {
  const onSubmit = (formData) => {
    props.postLoginThuk(formData.email, formData.password, formData.checkbox)
  }
  if (props.isAuth) {
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