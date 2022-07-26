import classes from './MyPosts.module.css';
import Post from './Post/Post';
import WritePostContainer from './WritePost/WritePostContainer';
import React, { FC } from 'react';
import { PostDataType } from '../../../types/types';

type PropsType = {
  postData : PostDataType[]
}

const MyPosts: FC<PropsType> = ({postData}) => {
  let postElement = postData.map((post: PostDataType) => <Post key={post.id} message={post.message} likeCount={post.likeCount} />)
  return (
    <div className={classes.postBlock}>
      <h2>my post</h2>
      <WritePostContainer />
      <div className={classes.posts}>
        {postElement}
      </div>
    </div>
  )
};

export default MyPosts;