import { addPostActionCreator } from '../../../../state/profile-reducer';
import WritePost from './WritePost';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
  return {
    newPostText: state.profilePage.newPostText,
  }
};

let mapDispatchToProps = (dispatch) => {
  return {
    addPost: (text) => dispatch(addPostActionCreator(text)),
  }
}

const WritePostContainer = connect(mapStateToProps, mapDispatchToProps)(WritePost);

export default WritePostContainer;