import React from 'react';
import StoreContext from '../../SroreContext';
import { addMessageActionCreator, onMessageChangeActionCreator } from '../../state/message-reducer';
import Dialogs from './Dialogs';

const DialogsContainer = (props) => {

  // let messagesPage = props.store.getState().messagesPage;

  // const addMessage = (text) => {
  //   props.store.dispatch(addMessageActionCreator(text));
  // };

  // let onMessageChange = (text) => {
  //   props.store.dispatch(onMessageChangeActionCreator(text));
  // };

  return (
    <StoreContext.Consumer>
      { (store) => {
        let messagesPage = store.getState().messagesPage;

        const addMessage = (text) => {
          store.dispatch(addMessageActionCreator(text));
        };
      
        let onMessageChange = (text) => {
          store.dispatch(onMessageChangeActionCreator(text));
        };
        return (
          <Dialogs messagesPage={messagesPage} addMessage={addMessage} onMessageChange={onMessageChange} />
        )
      }
    }


    </StoreContext.Consumer>

  )
};

export default DialogsContainer;