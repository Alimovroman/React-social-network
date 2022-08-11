import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { ContactsType, UserProfileType } from "../../../../types/types";
import { createField, Input } from "../../../common/Preloader/FormControl";
import classes from '../../../common/Preloader/FormControl.module.css';
import { FormDataProfileStatusType } from "../ProfileInfo";

type PropsLoginFormType = {
  userProfile: UserProfileType
}

let ProfileStatusForm: React.FC<InjectedFormProps<UserProfileType , PropsLoginFormType> & PropsLoginFormType> = ({handleSubmit, userProfile, error}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        full Name: {createField('text', 'fullName', 'Full Name', Input, [])}
      </div>
      <div>
        looking For A Job: {createField('checkbox', 'lookingForAJob', null, Input, [])}
      </div>
      <div>
        looking For A Job Description: {createField('text', 'lookingForAJobDescription', 'Job description', Input, [])}
      </div>
      <div>
        About me: {createField(`text`, `aboutMe`, `about Me`, Input, [] )}
      </div>
      <div>
        Contacts:
      </div>
      {Object.keys(userProfile.contacts).map((key: string) => {
        return <div key={key}>
            {key}: {createField(key, `contacts[${key}]`, null, Input, [])}
        </div>  
      })}
      {error && <div className={classes.error}>{error}</div>}

      <button>Save</button>
    </form>
  )
};

const ProfileStatusReduxForm = reduxForm<UserProfileType, PropsLoginFormType>({form: 'profileInfoData'})(ProfileStatusForm);

export default ProfileStatusReduxForm;