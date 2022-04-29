import React from 'react';
import { connect } from 'react-redux';
import { addMessage, onMessageChange } from '../../state/message-reducer';
import Dialogs from './Dialogs';

let mapStateToProps = (state) => {
  return {
    messagesPage: state.messagesPage
  }
};

// let mapDispatchToProps = (dispatch) => {
//   return {
//     addMessage: (text) => dispatch(addMessageActionCreator(text)),
//     onMessageChange: (text) => dispatch(onMessageChangeActionCreator(text))
//   }
// }

const SuperDialogContainer = connect(mapStateToProps, {addMessage, onMessageChange})(Dialogs);
export default SuperDialogContainer;