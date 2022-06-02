import Preloader from '../../common/Preloader/Preloader';
import classes from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus/ProfileStatus';
import avatar from '../../../assets/images/avatar-for-users.png';
import React, { useState } from 'react';
import ProfileStatusForm from './ProfileStatusForm/ProfileStatusForm';

const ProfileInfo = ({ userProfile, authorizedUserId, status, putStatus, userId, isOwner, savePhoto, saveProfileInfo }) => {
  const [editMode, setEditMode] = useState(false);
  if (userProfile == null || undefined) {
    return <Preloader />
  }
  let onAddAvatarOnServer = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  }
  let onEditMode = () => {
    setEditMode(true)
  }

  let onSave = (formData) => {  
    saveProfileInfo(formData).then(response => {
      if(response.saved === `saved`) {
        setEditMode(false)
      } else {
        setEditMode(true)
      }    
    })
  }

  return (
    <div>
      <div>
        <img src='https://www.gazetemistanbul.com/images/haberler/2015/09/quiksilver_iflas_bayragini_cekti_h12541_5805c.jpg' alt='banner'></img>
      </div>
      <div className={classes.userProfile}>
        <div>
          <img src={userProfile.photos.small ? userProfile.photos.small : avatar} alt='avatar' className={classes.avatar}></img>
          {isOwner && <input type='file' onChange={(e) => onAddAvatarOnServer(e)} />}
        </div>
        <div>
          <ProfileStatus authorizedUserId={authorizedUserId} status={status} putStatus={putStatus} userId={userId} />
          {!editMode
            ? <ProfileStatusBlock userProfile={userProfile} isOwner={isOwner} onEditMode={onEditMode} />
            : <ProfileStatusForm onSubmit={onSave} initialValues={userProfile} userProfile={userProfile} Contacts={Contacts}/>}

        </div>
      </div>
    </div>
  )
};

const ProfileStatusBlock = ({ userProfile, isOwner, onEditMode }) => {
  return (
    <div>
      {isOwner && <button onClick={() => onEditMode()}>Edit</button>}
      <h2 className={classes.nameUser}>{userProfile.fullName} and Finished 94 lesson</h2>
      <h3>JobDescription: {userProfile.lookingForAJobDescription}</h3>
      <p>Job search: {userProfile.lookingForAJob ? 'Yes' : 'Not'}</p>
      <p>About Me: {userProfile.aboutMe}</p>
      <div>
        <h4>Contacts</h4>
        {Object.keys(userProfile.contacts).map((key => {
          return <Contacts key={key} contactKey={key} contactValue={userProfile.contacts[key]} />
        }))}
      </div>
    </div>
  )
}

const Contacts = ({ contactKey, contactValue }) => {
  return (
    <div>
      {contactKey} : {contactValue}
    </div>
  )
}

export default ProfileInfo;