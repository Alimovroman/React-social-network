import classes from './Post.module.css';

const Post = (props) => {
  return (
    <div>
      {props.message}
      <div>
        <span>like</span>
        {props.likeCount}
      </div>
    </div>
  )
}

export default Post;