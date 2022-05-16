import React from "react";
import { connect } from "react-redux";
import { Field } from "redux-form";
import { reduxForm } from "redux-form";
import { logoutThunk, postLoginThuk } from "../../state/auth-reducer";
import { required } from "../../utils/validator";
import { Input } from "../common/Preloader/FormControl";

let LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
        <div>
          <Field type='text' name='login' placeholder="Login" component={Input} validate={required}/>
        </div>
        <div>
          <Field type='password' name='password' placeholder='Password' component={Input} validate={required}/>
        </div>
        <Field type='checkbox' name='checkbox' component={Input}/>Remember me
        <div>
          <button>Login</button>
        </div>
        <div>
          <button>Logout</button>
        </div>
      </form>
  )
}

LoginForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
  const onSubmit = (formData) => {
   // props.postLoginThuk(formData.login, formData.password, formData.checkbox)
    console.log(props.logAuth)
    if (!props.logAuth) {
     return props.postLoginThuk(formData.login, formData.password, formData.checkbox)
    } return props.logoutThunk()
  }
  
  return (
    <div>
      <h2>Login</h2>
      <LoginForm onSubmit={onSubmit}/>
    </div>
  )
};

let mapStateToProps = (state) => ({
  logAuth: state.auth.logAuth
});


export default connect(mapStateToProps, {postLoginThuk, logoutThunk})(Login);