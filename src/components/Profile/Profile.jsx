import MyPosts from './MyPosts/MyPosts';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {
  return (
    <main>
        <ProfileInfo />
        <MyPosts profilePage={props.profilePage} dispatch={props.dispatch} />
      </main>
  )
};

export default Profile;