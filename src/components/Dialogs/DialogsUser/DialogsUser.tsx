import classes from './../Dialogs.module.css';
import { NavLink } from 'react-router-dom';
import React, { FC } from 'react';

type PropsType = {
  id: number
  name: string
}

const DialogsUser: FC<PropsType> = ({id, name}) => {
  return (
    <div className={classes.dialog}>
      <NavLink to={'/dialogs/'+id} className={classes.dialogNavLink}>
        <img src='https://99px.ru/sstorage/41/2012/06/image_412806120141364286354.jpg' alt='avatar' className={classes.avatar}></img>
        <div className={classes.userName}>
          {name}
        </div>
      </NavLink>
    </div>
  )
}

export default DialogsUser;