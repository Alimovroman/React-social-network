import { connect } from 'react-redux';
import MyPosts from './MyPosts';
import classes from './MyPosts.module.css';

let mapStateToProps = (state) => {
  return {
    profilePage: state.profilePage
  }
};

const MyPostsContainer = connect(mapStateToProps)(MyPosts);

export default MyPostsContainer;