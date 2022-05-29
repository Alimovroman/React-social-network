import { Field } from 'redux-form';
import classes from './FormControl.module.css';
import React from 'react';

const FormControl = ({ input, meta: { touched, error, warning }, children, ...props }) => {
  return (
    <div className={classes.formControl + ' ' + (touched && error ? classes.error : ' ')}>
      {children}
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  )
}

export const Textarea = (props) => {
  const { input,children, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  )
};

export const Input = ({ input, meta: { touched, error, warning }, ...props }) => { // Надо сделать так же как и ТекстЭриа
  return (
    <div className={classes.formControl + ' ' + (touched && error ? classes.error : ' ')}>
      <input {...input} {...props} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  )
};

export const createField = (type, name, placeholder, component, validate, text='') => {
  return (
    <div>
      <Field type={type} name={name} placeholder={placeholder} component={component} validate={validate} />{text}
    </div>
  )
}