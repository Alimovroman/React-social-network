import { actionsProfile } from '../../../../state/profile-reducer';
import WritePost from './WritePost';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../../../../state/redux-store';
import { Dispatch } from 'redux';

let mapStateToProps = (state: RootState) => {
  // return {
  //   newPostText: state.profilePage.newPostText,
  // }
};

let mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    addPost: (text: string) => dispatch(actionsProfile.addPostActionCreator(text)),
  }
}

const WritePostContainer = connect(mapStateToProps, mapDispatchToProps)(WritePost);

export default WritePostContainer;