import './App.css';
import Nav from './components/Nav/Nav';
import { Route, Routes } from 'react-router-dom';
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import SuperDialogContainer from './components/Dialogs/DialogsContainer';
import FindUsersContainer from './components/FindUsers/FIndUsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login.jsx';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializationAppThunk } from './state/app-reducer';
import Preloader from './components/common/Preloader/Preloader'

class App extends React.Component {
  constructor(props) {
    super(props)
  };

  componentDidMount() {
    this.props.initializationAppThunk()
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
            <Route path='/profile/:userId' element={<ProfileContainer />} />
            <Route path='/profile/' element={<ProfileContainer />} />
            <Route path='/dialogs' element={<SuperDialogContainer />} />
            <Route path='/news' element={<News />} />
            <Route path='/music' element={<Music />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/users' element={<FindUsersContainer />} />
            <Route path='/auth' element={<Login />} />
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
export default compose( connect(mapStateToProps, { initializationAppThunk }))(App);
