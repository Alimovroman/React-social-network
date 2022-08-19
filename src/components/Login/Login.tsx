import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { Action } from "redux";
import { InjectedFormProps, reduxForm } from "redux-form";
import { ThunkDispatch } from "redux-thunk";
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

type FormaDAtaType = {
  email: string
  password: string
  checkbox: boolean
  captcha: string | null
}
const Login: FC = () => {
  const {isAuth, captchaUrl} = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<ThunkDispatch <RootState, void, Action> >()

  const onSubmit = (formData: FormaDAtaType) => {
    dispatch(postLoginThunk(formData.email, formData.password, formData.checkbox, formData.captcha))
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


export default Login;