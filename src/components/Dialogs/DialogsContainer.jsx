import React from 'react';
import { connect } from 'react-redux';
import { addMessage, onMessageChange } from '../../state/message-reducer';
import Dialogs from './Dialogs';
import withAuthRedirect from '../HOC/WithAuthRedirect';
import { compose } from 'redux';

let mapStateToProps = (state) => {
  return {
    messagesPage: state.messagesPage,
  }
};


// let mapDispatchToProps = (dispatch) => {
//   return {
//     addMessage: (text) => dispatch(addMessageActionCreator(text)),
//     onMessageChange: (text) => dispatch(onMessageChangeActionCreator(text))
//   }
// }

export default compose(connect(mapStateToProps, { addMessage, onMessageChange }),
  withAuthRedirect)(Dialogs)