import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';
import classes from './FormControl.module.css';
import React from 'react';
import { ValidatorsValueTypes } from '../../../utils/validator';

type FormControlType = {
//input: any
meta: WrappedFieldMetaProps
children: React.ReactNode
}

//type FormControlType = (obj:FormControlValueType) 

const FormControl:React.FC<FormControlType> = ({ meta: { touched, error, warning }, children }) => {
  return (
    <div className={classes.formControl + ' ' + (touched && error ? classes.error : ' ')}>
      {children}
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  )
}

type InputPropsType = {
  children: React.ReactNode
  props: {}
}
export const Textarea: React.FC<WrappedFieldProps & InputPropsType>= (props) => {
  const { input,children, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  )
};

type InputValueType = {
  input: HTMLInputElement
  meta: {
    touched: string
    error: string
    warning: string
  }
  props: {}
}

export const Input: React.FC<WrappedFieldProps>= ({ input, meta: { touched, error, warning }, ...props }) => { // Надо сделать так же как и ТекстЭриа
  return (
    <div className={classes.formControl + ' ' + (touched && error ? classes.error : ' ')}>
      <input {...input} {...props} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  )
};

export const createField = (type: string,
                            name: string,
                            placeholder: string | null,
                            component: React.FC<WrappedFieldProps> ,
                            validate: ValidatorsValueTypes[],
                            text='') => {
  return (
    <div>
      <Field type={type} name={name} placeholder={placeholder} component={component} validate={validate} />{text}
    </div>
  )
}