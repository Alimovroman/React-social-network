import './App.css';
import Nav from './components/Nav/Nav';
import { Navigate, Route, Routes } from 'react-router-dom';
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
// import SuperDialogContainer from './components/Dialogs/DialogsContainer';
import FindUsersContainer from './components/FindUsers/FIndUsersContainer';
// import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login.jsx';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializationAppThunk } from './state/app-reducer';
import Preloader from './components/common/Preloader/Preloader'
import WithReactLazy from './components/HOC/WithReactLazy';

const SuperDialogContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

const WithSuperDialogContainer = WithReactLazy(SuperDialogContainer);
const WithProfileContainer = WithReactLazy(ProfileContainer)

class App extends React.Component {
  catchAllUnhandleErrors = (PromiseRejectEvent) => {
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
      <div className='app-wrapper'>
        <HeaderContainer />
        <Nav />
        <div className='app-wrapper-content'>
          <Routes>
            <Route path='/' element={<Navigate to='/profile' />} />  {/*Стартовая Страница профайл */}
            <Route path='/profile/:userId' element={<WithProfileContainer />} />
            <Route path='/profile/' element={<WithProfileContainer />} />
            <Route path='/dialogs' element={<WithSuperDialogContainer />} />
            <Route path='/news' element={<News />} />
            <Route path='/music' element={<Music />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/users' element={<FindUsersContainer />} />
            <Route path='/auth' element={<Login />} />
            <Route path='*' element={<h2>404</h2>} />
          </Routes>
        </div>
      </div>
    );
  }
};

let mapStateToProps = (state) => {
  return {
    initialization: state.app.initialization
  }
}
//export default App;
export default compose(connect(mapStateToProps, { initializationAppThunk }))(App);
