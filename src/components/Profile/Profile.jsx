import MyPostsContainer from './MyPosts/MyPostContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import React from 'react';

const Profile = (props) => {
  return (
    <main>
      <ProfileInfo authorizedUserId={props.authorizedUserId} userProfile={props.userProfile}
        status={props.status} putStatus={props.putStatusThunk} userId={props.userId} />
      <MyPostsContainer />
    </main>
  )
};

export default Profile;