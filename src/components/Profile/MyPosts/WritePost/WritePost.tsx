import classes from './WritePost.module.css';
import { Field } from 'redux-form';
import { reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../../utils/validator';
import { Textarea } from '../../../common/Preloader/FormControl';
import React, { FC } from 'react';

const maxLength15 = maxLengthCreator(15);

let NewPostForm = (props: any) => {
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

//@ts-ignore
NewPostForm = reduxForm({form: `newPost`})(NewPostForm);

type PropsType = {
  addPost: (newPost: string) => void
}

const WritePost: FC<PropsType> = ({addPost}) => {
  let addPostToForm = (formData: any) => {
    addPost(formData.newPost)
    formData.newPost = ''
  };

  return (
    <div className={classes.writePost}>
      <NewPostForm onSubmit={addPostToForm}/>
    </div>
  )
};

export default WritePost;