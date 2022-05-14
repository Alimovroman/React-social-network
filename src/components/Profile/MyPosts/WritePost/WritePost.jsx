import classes from './WritePost.module.css';
import React from 'react';
import { Field } from 'redux-form';
import { reduxForm } from 'redux-form';

let NewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component='textarea' placeholder='your news...' name='newPost'/>
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