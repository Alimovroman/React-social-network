import MyPosts from './MyPosts/MyPosts';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {
  return (
    <main>
        <ProfileInfo />
        <MyPosts profilePage={props.profilePage} addPost={props.addPost} changePostText={props.changePostText}/>
      </main>
  )
};

export default Profile;