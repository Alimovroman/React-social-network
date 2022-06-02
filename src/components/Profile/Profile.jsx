import MyPostsContainer from './MyPosts/MyPostContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import React from 'react';

const Profile = (props) => {
  return (
    <main>
      <ProfileInfo authorizedUserId={props.authorizedUserId} userProfile={props.userProfile}
        status={props.status} putStatus={props.putStatusThunk} userId={props.userId}  isOwner={props.isOwner}
        savePhoto={props.savePhoto} saveProfileInfo={props.saveProfileInfo}/>
      <MyPostsContainer />
    </main>
  )
};

export default Profile;