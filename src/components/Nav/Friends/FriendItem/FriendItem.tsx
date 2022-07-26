import classes from './../../Nav.module.css'
import React, { FC } from 'react';

type PropsType = {
  name: string
}

const FriendItem: FC<PropsType> = ({name}) => {
  return (
    <div className={classes.friendItem}>
      <img src='https://cs6.pikabu.ru/avatars/521/v521522.jpg?924365380' alt='avatar' className={classes.avatar}></img>
      <div>{name}</div>
    </div>
  )
}

export default FriendItem;