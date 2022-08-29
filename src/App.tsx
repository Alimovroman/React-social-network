import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import FindUsersContainer from './components/FindUsers/FIndUsersContainer';
import Login from './components/Login/Login';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializationAppThunk } from './state/app-reducer';
import Preloader from './components/common/Preloader/Preloader'
import WithReactLazy from './components/HOC/WithReactLazy';
import { RootState } from './state/redux-store';
import 'antd/dist/antd.css';
import './index.css';

import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Row } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Link } from 'react-router-dom';
import Header from './components/Header/Header';


const { Content, Footer, Sider } = Layout;



const SuperDialogContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const ChatPageContainer = React.lazy(() => import('./components/Pages/Chat/ChatPage'))

const WithSuperDialogContainer = WithReactLazy(SuperDialogContainer);
const WithProfileContainer = WithReactLazy(ProfileContainer)
const WithChatPageContainer = WithReactLazy(ChatPageContainer)

type PropsType = MapStateToPropsType & MapDispatchToPropsType

class App extends React.Component<PropsType> {
  catchAllUnhandleErrors = (e: PromiseRejectionEvent) => {
    console.log(`Some Error Occured`)
  }
  componentDidMount() {
    this.props.initializationAppThunk();
    window.addEventListener('unhandledrejection', this.catchAllUnhandleErrors); // если в промисах пришла ошибка, она поямается и отобразиться
  }
  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandleErrors);
  }
  render() {
    if (!this.props.initialization) {
      return <Preloader />
    } return (
      <Layout>
        <Header />
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['2']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              //items={items2}
              >
                <SubMenu key={`sub1`} icon={<UserOutlined />} title={`My Profile`}>
                  <Menu.Item key={`1`}><Link to='/profile'>Profile</Link></Menu.Item>
                  <Menu.Item key={`2`}><Link to='/dialogs'>Messages</Link></Menu.Item>
                </SubMenu>
                <SubMenu key={`sub2`} icon={<LaptopOutlined />} title={`Developers`}>
                  <Menu.Item key={`3`}> <Link to='/developers' >Find users</Link></Menu.Item>
                </SubMenu>
                <SubMenu key={`sub3`} icon={<NotificationOutlined />} title={`sub nuv 3`}>
                  <Menu.Item key={`4`}><Link to='/chat'>Chat</Link></Menu.Item>
                </SubMenu>
              </Menu>

            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Routes>
                <Route path='/' element={<Navigate to='/profile' />} />  {/*Стартовая Страница профайл */}
                <Route path='/profile/:userId' element={<WithProfileContainer />} />
                <Route path='/profile/' element={<WithProfileContainer />} />
                <Route path='/dialogs' element={<WithSuperDialogContainer />} />
                <Route path='/news' element={<News />} />
                <Route path='/music' element={<Music />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/developers' element={<FindUsersContainer />} />
                <Route path='/chat' element={<WithChatPageContainer/>} />
                <Route path='/auth' element={<Login />} />
                <Route path='*' element={<h2>404</h2>} />
              </Routes>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>

      // <div className='app-wrapper'>
      //   <HeaderContainer />
      //   <Nav />
      //   <div className='app-wrapper-content'>
      //     <Routes>
      //       <Route path='/' element={<Navigate to='/profile' />} />  {/*Стартовая Страница профайл */}
      //       <Route path='/profile/:userId' element={<WithProfileContainer />} />
      //       <Route path='/profile/' element={<WithProfileContainer />} />
      //       <Route path='/dialogs' element={<WithSuperDialogContainer />} />
      //       <Route path='/news' element={<News />} />
      //       <Route path='/music' element={<Music />} />
      //       <Route path='/settings' element={<Settings />} />
      //       <Route path='/users' element={<FindUsersContainer />} />
      //       <Route path='/auth' element={<Login />} />
      //       <Route path='*' element={<h2>404</h2>} />
      //     </Routes>
      //   </div>
      // </div>
    );
  }
};

type MapStateToPropsType = {
  initialization: boolean
}
let mapStateToProps = (state: RootState): MapStateToPropsType => {
  return {
    initialization: state.app.initialization
  }
}
type MapDispatchToPropsType = {
  initializationAppThunk: () => void
}

export default compose<React.ComponentType>(connect(mapStateToProps, { initializationAppThunk }))(App);
