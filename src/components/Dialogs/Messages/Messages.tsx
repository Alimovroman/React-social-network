import classes from './../Dialogs.module.css';
import React, { FC } from 'react';

type PropsType = {
  message: string
}

const Messages: FC<PropsType> = ({message}) => {
  return (
    <div className={classes.messageItem} >
      {message}
    </div>
  )
}

export default Messages;