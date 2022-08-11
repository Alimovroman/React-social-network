import Preloader from '../../common/Preloader/Preloader';
import classes from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus/ProfileStatus';
import avatar from '../../../assets/images/avatar-for-users.png';
import React, { ChangeEvent, FC, ReactNode, useState } from 'react';
import ProfileStatusForm from './ProfileStatusForm/ProfileStatusForm';
import { ContactsType, UserProfileType } from '../../../types/types';
import { JsxElement } from 'typescript';
import { WrappedFieldProps } from 'redux-form';
import { ValidatorsValueTypes } from '../../../utils/validator';

type ResponseType = {
  saved: string
}

type PropsType = {
  authorizedUserId: number
  userProfile: UserProfileType
  status: string
  userId: string
  isOwner: boolean
  putStatus: (status: string) => void
  savePhoto: (photo: File) => void
  saveProfileInfo: (userProfile: UserProfileType) => Promise<any>
}

export type FormDataProfileStatusType = {
  userProfile: UserProfileType
}

const ProfileInfo: FC<PropsType> = ({ userProfile, authorizedUserId, status, putStatus, userId, isOwner, savePhoto, saveProfileInfo }) => {
  const [editMode, setEditMode] = useState(false);
  if (userProfile == null || undefined) {
    return <Preloader />
  }
  let onAddAvatarOnServer = (e: ChangeEvent<HTMLInputElement>) => { // Убрать Any ChangeEvent<HTMLInputElement> не работает с ?
    if (e.target.files && e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  }
  let onEditMode = () => {
    setEditMode(true)
  }

  let onSave = (formData: UserProfileType) => {
    //todo remove then
    saveProfileInfo(formData).then((response: ResponseType) => {
      
      if (response.saved === `saved`) {
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

            : <ProfileStatusForm onSubmit={onSave} userProfile={userProfile}  />}

        </div>
      </div>
    </div>
  )
};

type PropsProfileStatusBlockType = {
  userProfile: UserProfileType
  isOwner: boolean
  onEditMode: () => void
}

const ProfileStatusBlock: FC<PropsProfileStatusBlockType> = ({ userProfile, isOwner, onEditMode }) => {
  return (
    <div>
      {isOwner && <button onClick={() => onEditMode()}>Edit</button>}
      <h2 className={classes.nameUser}>{userProfile.fullName} and Finished 94 lesson</h2>
      <h3>JobDescription: {userProfile.lookingForAJobDescription}</h3>
      <p>Job search: {userProfile.lookingForAJob ? 'Yes' : 'Not'}</p>
      <p>About Me: {userProfile.aboutMe}</p>
      <div>
        <h4>Contacts</h4>
        {Object
          .keys(userProfile.contacts)
          .map(((key: string) => {

            return <Contacts key={key} contactKey={key} contactValue={userProfile.contacts[key as  keyof ContactsType]} />
          }))}
      </div>
    </div>
  )
}

type PropsContactsType = {
  contactKey: string
  contactValue: string
}
const Contacts: FC<PropsContactsType> = ({ contactKey, contactValue }) => {
  return (
    <div>
      {contactKey} : {contactValue}
    </div>
  )
}

export default ProfileInfo;