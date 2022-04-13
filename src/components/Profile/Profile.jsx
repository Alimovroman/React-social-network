import MyPosts from './MyPosts/MyPosts';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {
  return (
    <main>
        <ProfileInfo />
        <MyPosts postData={props.state.postData} addPost={props.addPost}/>
      </main>
  )
};

export default Profile;