import classes from './WritePost.module.css';
import { Field } from 'redux-form';
import { reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../../utils/validator';
import { Textarea } from '../../../common/Preloader/FormControl';
import React from 'react';

const maxLength15 = maxLengthCreator(15);

let NewPostForm = (props) => {
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

NewPostForm = reduxForm({form: `newPost`})(NewPostForm);

const WritePost = (props) => {
  let addPost = (formData) => {
    props.addPost(formData.newPost)
    formData.newPost = ''
  };

  return (
    <div className={classes.writePost}>
      <NewPostForm onSubmit={addPost}/>
    </div>
  )
};

export default WritePost;