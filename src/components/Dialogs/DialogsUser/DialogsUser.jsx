import classes from './../Dialogs.module.css';
import { NavLink } from 'react-router-dom';
import React from 'react';

const DialogsUser = (props) => {
  return (
    <div className={classes.dialog}>
      <NavLink to={'/dialogs/'+props.id} className={classes.dialogNavLink}>
        <img src='https://99px.ru/sstorage/41/2012/06/image_412806120141364286354.jpg' alt='avatar' className={classes.avatar}></img>
        <div className={classes.userName}>
          {props.name}
        </div>
      </NavLink>
    </div>
  )
}

export default DialogsUser;