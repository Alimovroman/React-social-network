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

const App = (props) => {
  return (
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
        </Routes>
      </div>
    </div>
  );
};

export default App;
