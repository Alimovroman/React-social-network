import { connect } from 'react-redux';
import { actionsMessage, DialogsDataType, MessagesDataType } from '../../state/message-reducer';
import Dialogs from './Dialogs';
import withAuthRedirect from '../HOC/WithAuthRedirect';
import { compose } from 'redux';
import { RootState } from '../../state/redux-store';
import React from 'react';

type MapStateToPropsType = {
  messages: MessagesDataType[]
  dialogs: DialogsDataType[]
}

let mapStateToProps = (state: RootState): MapStateToPropsType => {
  return {
    messages: state.messagesPage.messagesData,
    dialogs: state.messagesPage.dialogsData
  }
};

export default compose<React.ComponentType>(connect(mapStateToProps, { addMessage: actionsMessage.addMessage }),
  withAuthRedirect)(Dialogs)