import './App.css';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import { Route, Routes } from 'react-router-dom';
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import SuperDialogContainer from './components/Dialogs/DialogsContainer';
import FindUsersContainer from './components/FindUsers/FIndUsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';

const App = (props) => {
  return (
    <div className='app-wrapper'>
      <Header />
      <Nav />
      <div className='app-wrapper-content'>
        <Routes>
          <Route path='/profile' element={<ProfileContainer />} />
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
