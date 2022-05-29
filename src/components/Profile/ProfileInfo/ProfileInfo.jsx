import Preloader from '../../common/Preloader/Preloader';
import classes from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus/ProfileStatus';
import avatar from '../../../assets/images/avatar-for-users.png';
import React from 'react';

const ProfileInfo = ({userProfile, authorizedUserId, status, putStatus, userId}) => {
  if (userProfile == null || undefined) {
    return <Preloader />
  }
  return (
    <div>
      <div>
        <img src='https://www.gazetemistanbul.com/images/haberler/2015/09/quiksilver_iflas_bayragini_cekti_h12541_5805c.jpg' alt='banner'></img>
      </div>
      <div className={classes.userProfile}>
        <div>
          <img src={userProfile.photos.small ? userProfile.photos.small :  avatar} alt='avatar' className={classes.avatar}></img>
        </div>
        <div>
          <ProfileStatus authorizedUserId={authorizedUserId} status={status} putStatus={putStatus} userId={userId}/>
          <h2 className={classes.nameUser}>{userProfile.fullName} and Finished 94 lesson</h2>
          <h3>{userProfile.lookingForAJobDescription}</h3>
          <p>Job search: {userProfile.lookingForAJob ? 'Yes' : 'Not'}</p>
          <p>About Me: {userProfile.aboutMe}</p>
          <div>
            <h4>Social network</h4>
            <p>Vk: <a href={`http://${userProfile.contacts.vk}`}>{userProfile.contacts.vk}</a></p>
            <p>Website:  <a href={`http://${userProfile.contacts.website}`}>{userProfile.contacts.website}</a></p>
            <p>instagram:  <a href={`http://${userProfile.contacts.instagram}`}>{userProfile.contacts.instagram}</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo;