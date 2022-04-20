import classes from './WritePost.module.css';
import React from 'react';
import { addPostActionCreator, onPostChangeActionCreator } from '../../../../state/profile-reducer';
import WritePost from './WritePost';
import StoreContext from '../../../../SroreContext';

const WritePostContainer = (props) => {

  //let newPostElement = React.createRef();




  return (
    <StoreContext.Consumer>
      {(store) => {
        let addPost = (text) => {
          store.dispatch(addPostActionCreator(text));
        };
        let onPostChange = (text) => {
          store.dispatch(onPostChangeActionCreator(text));
        };
        let newPostText = store.getState().profilePage.newPostText;
        return <WritePost addPost={addPost} onPostChange={onPostChange} newPostText={newPostText} />
      }
      }

    </StoreContext.Consumer>

  )
};

export default WritePostContainer;