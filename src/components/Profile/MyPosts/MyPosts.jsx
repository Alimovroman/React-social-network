import classes from './MyPosts.module.css';
import Post from './Post/Post';
import WritePost from './WritePost/WritePost';

const MyPosts = () => {
  return (
    <div className={classes.postBlock}>
    <h2>my post</h2>
    <WritePost />
    <div className={classes.posts}>
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  </div>
  )
};

export default MyPosts;