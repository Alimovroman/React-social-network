import React from "react";
import { reduxForm } from "redux-form";
import { createField, Input } from "../../../common/Preloader/FormControl";
import classes from '../../../common/Preloader/FormControl.module.css';

let ProfileStatusForm = ({handleSubmit, userProfile, Contacts, error}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        full Name: {createField('text', 'fullName', 'Full Name', 'input')}
      </div>
      <div>
        looking For A Job: {createField('checkbox', 'lookingForAJob', null, 'input')}
      </div>
      <div>
        looking For A Job Description: {createField('text', 'lookingForAJobDescription', 'Job description', 'input')}
      </div>
      <div>
        About me: {createField(`text`, `aboutMe`, `about Me`, `input` )}
      </div>
      <div>
        Contacts:
      </div>
      {Object.keys(userProfile.contacts).map(key => {
        return <Contacts key={key} contactKey={key} contactValue={createField('text', `contacts[${key}]`, key, Input )}/>
      })}
      {error && <div className={classes.error}>{error}</div>}

      <button>Save</button>
    </form>
  )
};

ProfileStatusForm = reduxForm({form: 'profileInfoData'})(ProfileStatusForm);

export default ProfileStatusForm;