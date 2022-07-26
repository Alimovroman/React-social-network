import { connect } from 'react-redux';
import { addMessage } from '../../state/message-reducer';
import Dialogs from './Dialogs';
import withAuthRedirect from '../HOC/WithAuthRedirect';
import { compose } from 'redux';
import { RootState } from '../../state/redux-store';

let mapStateToProps = (state: RootState) => {
  return {
    messages: state.messagesPage.messagesData,
    dialogs: state.messagesPage.dialogsData
  }
};

export default compose(connect(mapStateToProps, { addMessage }),
  withAuthRedirect)(Dialogs)