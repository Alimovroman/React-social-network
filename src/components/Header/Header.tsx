import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';
import React, { FC } from 'react';

type PropsType = {
  isAuth: boolean
  login: string | null
  onLogout: () => void
}

const Header: FC<PropsType> = ({isAuth, login, onLogout}) => {
  return (
    <header className={classes.header}>
      <div>
        <img src="https://c0.klipartz.com/pngpicture/287/900/gratis-png-ilustracion-de-surfista-tabla-de-surf-surf-surf-el-mar-thumbnail.png" alt='logo'></img>
      </div>
      <div>
        {isAuth
          ? <div>{login} <button onClick={onLogout}>Log out</button></div>
          : <NavLink to='/auth' className={classes.loginBlock}>Login</NavLink>
        }
      </div>

    </header>
  )
}

export default Header;