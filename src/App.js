import './App.css';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import Nav from './components/Nav/Nav';
import Dialogs from './components/Dialogs/Dialogs';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';

const App = (props) => {
  return (
    <div className='app-wrapper'>
      <Header />
      <Nav state={props.state.sideBar} />
      <div className='app-wrapper-content'>
        <Routes>
          <Route path='/profile' element={<Profile
            profilePage={props.state.profilePage} addPost={props.store.addPost.bind(props.store)} changePostText={props.store.changePostText.bind(props.store)}/>} />
          <Route path='/dialogs' element={<Dialogs 
            messagesPage={props.state.messagesPage} addMessage={props.store.addMessage.bind(props.store)} changeMessageText={props.store.changeMessageText.bind(props.store)}/>} />
          <Route path='/news' element={<News />} />
          <Route path='/music' element={<Music />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
