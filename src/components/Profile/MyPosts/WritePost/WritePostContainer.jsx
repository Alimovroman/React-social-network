import classes from './WritePost.module.css';
import React from 'react';
import { addPostActionCreator } from '../../../../state/profile-reducer';
import WritePost from './WritePost';
import { connect } from 'react-redux';

// const WritePostContainer = (props) => {

//   //let newPostElement = React.createRef();

//   return (
//     <StoreContext.Consumer>
//       {(store) => {
//         let addPost = (text) => {
//           store.dispatch(addPostActionCreator(text));
//         };
//         let onPostChange = (text) => {
//           store.dispatch(onPostChangeActionCreator(text));
//         };
//         let newPostText = store.getState().profilePage.newPostText;
//         return <WritePost addPost={addPost} onPostChange={onPostChange} newPostText={newPostText} />
//       }
//       }

//     </StoreContext.Consumer>

//   )
// };

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