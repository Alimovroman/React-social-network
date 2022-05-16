import classes from './FormControl.module.css'

const FormControl = ({ input, meta: { touched, error, warning },child, ...props }) => {
  return (
    <div className={classes.formControl + ' ' + (touched && error ? classes.error : ' ')}>
      {props.children}
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  )
}

export const Textarea = (props) => {
  const { input, meta: { touched, error, warning },children, ...restProps } = props;
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
}