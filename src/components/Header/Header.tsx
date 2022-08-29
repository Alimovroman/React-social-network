import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/redux-store';
import { Avatar, Button, Col, Layout, Menu, Row } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { logoutThunk } from '../../state/auth-reducer';

const Header: FC = () => {
  const {isAuth, login} = useSelector((state: RootState) => state.auth)
  const { Header } = Layout;
  const dispatch = useDispatch<ThunkDispatch<RootState, void, Action>>()

  const onLogout = () => {
    dispatch(logoutThunk())
  }
  return (
    <Header className="header">
    <Row>
      <Col span='18'>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key={'1'}><Link to='/developers'>Developers</Link></Menu.Item>
        </Menu>
      </Col>
           {isAuth
           ? <>
            <Col span='1'><Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} /></Col>
            {/* {login}  */}
            <Col span='5'><Button onClick={onLogout}>Log out</Button></Col>
           </>
           : <Col span='6'><Button>
              <Link to='/auth' className={classes.loginBlock}>Login</Link>
            </Button></Col>
         }
      
    </Row>
  </Header>
    // <header className={classes.header}>
    //   <div>
    //     <img src="https://c0.klipartz.com/pngpicture/287/900/gratis-png-ilustracion-de-surfista-tabla-de-surf-surf-surf-el-mar-thumbnail.png" alt='logo'></img>
    //   </div>
    //   <div>
    //     {isAuth
    //       ? <div>{login} <button onClick={onLogout}>Log out</button></div>
    //       : <NavLink to='/auth' className={classes.loginBlock}>Login</NavLink>
    //     }
    //   </div>
    // </header>
  )
}

export default Header;