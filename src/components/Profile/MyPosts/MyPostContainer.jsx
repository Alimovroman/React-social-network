import { connect } from 'react-redux';
import MyPosts from './MyPosts';

let mapStateToProps = (state) => {
  return {
    profilePage: state.profilePage
  }
};

const MyPostsContainer = connect(mapStateToProps)(MyPosts);

export default MyPostsContainer;