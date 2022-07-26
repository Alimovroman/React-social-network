import { addPostActionCreator } from '../../../../state/profile-reducer';
import WritePost from './WritePost';
import { connect } from 'react-redux';
import { RootState } from '../../../../state/redux-store';

let mapStateToProps = (state: RootState) => {
  // return {
  //   newPostText: state.profilePage.newPostText,
  // }
};

let mapDispatchToProps = (dispatch: any) => {
  return {
    addPost: (text: string) => dispatch(addPostActionCreator(text)),
  }
}

const WritePostContainer = connect(mapStateToProps, mapDispatchToProps)(WritePost);

export default WritePostContainer;