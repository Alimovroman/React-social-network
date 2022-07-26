import { connect } from 'react-redux';
import { RootState } from '../../../state/redux-store';
import MyPosts from './MyPosts';

let mapStateToProps = (state: RootState) => {
  return {
    postData: state.profilePage.postData
  }
};

const MyPostsContainer = connect(mapStateToProps)(MyPosts);

export default MyPostsContainer;