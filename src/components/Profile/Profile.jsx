import MyPosts from './MyPosts/MyPosts';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {
  return (
    <main>
        <ProfileInfo />
        <MyPosts postData={props.postData} />
      </main>
  )
};

export default Profile;