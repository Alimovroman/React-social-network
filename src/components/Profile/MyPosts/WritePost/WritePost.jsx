import classes from './WritePost.module.css';
import React from 'react';
import { Field } from 'redux-form';
import { reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../../utils/validator';
import { Textarea } from '../../../common/Preloader/FormControl';

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


  let onSubmit = (formData) => {
    console.log(formData)
  }
  return (
    <div className={classes.writePost}>
      <NewPostForm onSubmit={addPost}/>
    </div>
  )
};

export default WritePost;