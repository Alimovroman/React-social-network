import MyPostsContainer from './MyPosts/MyPostContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import React, { FC } from 'react';
import { UserProfileType } from '../../types/types';

type PropsType = {
  authorizedUserId: number
  userProfile: UserProfileType
  status: string
  userId: string
  isOwner: boolean
  putStatusThunk: (status: string) => void
  savePhoto: (photo: string) => void
  saveProfileInfo: (userProfile: UserProfileType) => void
}

const Profile: FC<PropsType> = ({ authorizedUserId, userProfile, status, putStatusThunk, userId, isOwner, savePhoto, saveProfileInfo }) => {
  return (
    <main>
      <ProfileInfo authorizedUserId={authorizedUserId} userProfile={userProfile}
        status={status} putStatus={putStatusThunk} userId={userId} isOwner={isOwner}
        savePhoto={savePhoto} saveProfileInfo={saveProfileInfo} />
      <MyPostsContainer />
    </main>
  )
};

export default Profile;