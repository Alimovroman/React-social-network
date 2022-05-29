import classes from './../Dialogs.module.css';
import React from 'react';

const Messages = (props) => {
  return (
    <div className={classes.messageItem} >
      {props.message}
    </div>
  )
}

export default Messages;