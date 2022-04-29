import MyPostsContainer from './MyPosts/MyPostContainer';
import MyPosts from './MyPosts/MyPosts';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {
  return (
    <main>
        <ProfileInfo userProfile={props.userProfile}/>
        <MyPostsContainer />
      </main>
  )
};

export default Profile;