import classes from './MyPosts.module.css';
import Post from './Post/Post';
import WritePost from './WritePost/WritePost';

const MyPosts = () => {
  return (
    <div className={classes.postBlock}>
    <h2>my post</h2>
    <WritePost />
    <div className={classes.posts}>
      <Post message = 'Hi, how are you?' numberOfLike = '7'/>
      <Post message = 'Where are you from?' numberOfLike = '14'/>
      <Post message = 'Do you like a pizza?' numberOfLike = '11'/>
      <Post message = 'Is he a driver?' numberOfLike = '22'/>
    </div>
  </div>
  )
};

export default MyPosts;