import classes from './MyPosts.module.css';
import Post from './Post/Post';
import WritePost from './WritePost/WritePost';

const MyPosts = () => {

  let postData = [
    { id: 1, message: 'Hi, how are you?', likeCount: '7' },
    { id: 2, message: 'Go to play in poker?', likeCount: '14' },
    { id: 3, message: 'Do you wont eat?', likeCount: '19' },
    { id: 4, message: 'yo yo yo', likeCount: '32' }
  ]

  return (
    <div className={classes.postBlock}>
      <h2>my post</h2>
      <WritePost />
      <div className={classes.posts}>
        <Post message={postData[0].message} likeCount={postData[0].likeCount} />
        <Post message={postData[1].message} likeCount={postData[1].likeCount} />
        <Post message={postData[2].message} likeCount={postData[2].likeCount} />
        <Post message={postData[3].message} likeCount={postData[3].likeCount} />
      </div>
    </div>
  )
};

export default MyPosts;