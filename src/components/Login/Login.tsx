import React, { FC } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { reduxForm } from "redux-form";
import { postLoginThunk } from "../../state/auth-reducer";
import { RootState } from "../../state/redux-store";
import { required } from "../../utils/validator";
import { createField, Input } from "../common/Preloader/FormControl";
import classes from './Login.module.css'

type PropsLoginFormType = {
  handleSubmit: () => void
  error: string | null
  captchaUrl: string | null
}

let LoginForm: FC<PropsLoginFormType> = ({handleSubmit, error, captchaUrl}) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField('text', 'email', 'email', Input, required)}
      {createField('password', 'password', 'Password', Input, required)}
      {createField('checkbox', 'checkbox', null, Input, null, 'Remember me')}
      {error
        ? <div className={classes.error}>{error}</div>
        : null}
      {captchaUrl && <img src={captchaUrl} alt='captcha'/>}
      {captchaUrl && createField(`text`, `captcha`, `symbol`, Input, null)}
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}
//@ts-ignore
LoginForm = reduxForm({ form: 'login' })(LoginForm)

type PropsType = {
  isAuth: boolean
  captchaUrl: string | null
  postLoginThunk: (email: string, password: string, rememberMe: boolean, captcha: string | null)  => void
}

type FormaDAtaType = {
  email: string
  password: string
  checkbox: boolean
  captcha: string | null
}
const Login: FC<PropsType> = ({postLoginThunk, isAuth, captchaUrl}) => {
  const onSubmit = (formData: FormaDAtaType) => {
    postLoginThunk(formData.email, formData.password, formData.checkbox, formData.captcha)
  }
  if (isAuth) {
    return <Navigate to={'/profile'} />
  }
  return (
    <div>
      <h2>Login</h2>
      {/* @ts-ignore */}
      <LoginForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
  )
};

let mapStateToProps = (state: RootState) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
});


export default connect(mapStateToProps, { postLoginThunk })(Login);