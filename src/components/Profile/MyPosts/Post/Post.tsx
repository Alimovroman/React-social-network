import classes from './Post.module.css';
import React, { FC } from 'react';

type PropsType = {
  message: string
  likeCount: string
}

const Post: FC<PropsType> = ({message, likeCount}) => {
  return (
    <div className={classes.post}>
      <div className={classes.postUser}>
        <img className={classes.avatar} src='https://cs6.pikabu.ru/avatars/2184/x2184082-11688795.png' alt='avatar'></img>
        <div className={classes.message}>
          {message}
          <div>
            <span>like</span>
            {likeCount}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post;