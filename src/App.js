import './App.css';
import Header from './components/Header';
import Profile from './components/Profile';
import Nav from './components/Nav';

const App = () => {
  return (
    <div className='app-wrapper'>
      <Header />
      <Nav />
      <Profile />
    </div>
  );
};

export default App;
