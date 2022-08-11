import React, { FC } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { InjectedFormProps, reduxForm } from "redux-form";
import { postLoginThunk } from "../../state/auth-reducer";
import { RootState } from "../../state/redux-store";
import { required } from "../../utils/validator";
import { createField, Input } from "../common/Preloader/FormControl";
import classes from './Login.module.css'

type PropsLoginFormType = {
  captchaUrl: string | null
}

let LoginForm: FC<InjectedFormProps<FormaDAtaType, PropsLoginFormType> & PropsLoginFormType> = ({handleSubmit, error, captchaUrl}) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField('text', 'email', 'email', Input, [required])}
      {createField('password', 'password', 'Password', Input, [required])}
      {createField('checkbox', 'checkbox', null, Input, [], 'Remember me')}
      {error
        ? <div className={classes.error}>{error}</div>
        : null}
      {captchaUrl && <img src={captchaUrl} alt='captcha'/>}
      {captchaUrl && createField(`text`, `captcha`, `symbol`, Input, [])}
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm<FormaDAtaType, PropsLoginFormType>({ form: 'login' })(LoginForm)

type MapStateToPropsType = {
  isAuth: boolean
  captchaUrl: string | null
}

type MapDispatchToPropsType = {
  postLoginThunk: (email: string, password: string, rememberMe: boolean, captcha: string | null)  => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

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
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
  )
};

let mapStateToProps = (state: RootState): MapStateToPropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
});


export default connect(mapStateToProps, { postLoginThunk })(Login);