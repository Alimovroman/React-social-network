import classes from './WritePost.module.css';
import { Field, InjectedFormProps } from 'redux-form';
import { reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../../utils/validator';
import { Textarea } from '../../../common/Preloader/FormControl';
import React, { FC } from 'react';

const maxLength15 = maxLengthCreator(15);

let NewPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={Textarea} name='newPost' validate={[required, maxLength15]}  />
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  )
};


const NewPostReduxForm = reduxForm<FormDataType>({form: `newPost`})(NewPostForm);

type PropsType = {
  addPost: (newPost: string) => void
}

type FormDataType = {
  newPost: string
}

const WritePost: FC<PropsType> = ({addPost}) => {
  let addPostToForm = (formData: FormDataType) => {
    addPost(formData.newPost)
    formData.newPost = ''
  };

  return (
    <div className={classes.writePost}>
      <NewPostReduxForm onSubmit={addPostToForm}/>
    </div>
  )
};

export default WritePost;