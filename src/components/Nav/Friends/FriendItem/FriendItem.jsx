import classes from './../../Nav.module.css'
import React from 'react';

const FriendItem = (props) => {
  return (
    <div className={classes.friendItem}>
      <img src='https://cs6.pikabu.ru/avatars/521/v521522.jpg?924365380' alt='avatar' className={classes.avatar}></img>
      <div>{props.name}</div>
    </div>
  )
}

export default FriendItem;