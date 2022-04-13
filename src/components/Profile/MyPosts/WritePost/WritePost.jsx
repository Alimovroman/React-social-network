import classes from './WritePost.module.css';
import React from 'react';

const WritePost = (props) => {
  let newPostElement = React.createRef();
  let addPost = () => {
    let text = newPostElement.current.value;
    props.addPost(text)
    //alert(text)
  };

  return (
    <div className={classes.writePost}>
      <div>
        <textarea ref={newPostElement} maxLength='250' cols='80' rows='3' placeholder='your news...'></textarea>
      </div>
      <button onClick={addPost}>Send</button>
    </div>
  )
};

export default WritePost;