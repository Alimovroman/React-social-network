import classes from './Post.module.css';

const Post = (props) => {
  return (
    <div className={classes.post}>
      <div className={classes.postUser}>
        <img className={classes.avatar} src='https://cs6.pikabu.ru/avatars/2184/x2184082-11688795.png' alt='avatar'></img>
        <div className={classes.message}>
          {props.message}
          <div>
            <span>like</span>
            {props.likeCount}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post;