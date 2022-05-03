import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <header className={classes.header}>
      <div>
        <img src="https://c0.klipartz.com/pngpicture/287/900/gratis-png-ilustracion-de-surfista-tabla-de-surf-surf-surf-el-mar-thumbnail.png" alt='logo'></img>
      </div>
      <div>
        {props.isAuth ? props.login :
          <NavLink to='/auth' className={classes.loginBlock}>Login</NavLink>
        }
      </div>

    </header>
  )
}

export default Header;