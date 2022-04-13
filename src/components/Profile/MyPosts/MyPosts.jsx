import classes from './MyPosts.module.css';
import Post from './Post/Post';
import WritePost from './WritePost/WritePost';

const MyPosts = (props) => {
  let postElement = props.postData.map(post => <Post message={post.message} likeCount={post.likeCount} />)

  return (
    <div className={classes.postBlock}>
      <h2>my post</h2>
      <WritePost addPost={props.addPost}/>
      <div className={classes.posts}>
        {postElement}
      </div>
    </div>
  )
};

export default MyPosts;