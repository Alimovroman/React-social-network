import MyPostsContainer from './MyPosts/MyPostContainer';
import MyPosts from './MyPosts/MyPosts';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import React from 'react';

const Profile = (props) => {
  return (
    <main>
        <ProfileInfo userProfile={props.userProfile} status={props.status} putStatus={props.putStatusThunk} userId={props.userId}/>
        <MyPostsContainer />
      </main>
  )
};

export default Profile;