import { connect } from 'react-redux';
import { addMessage } from '../../state/message-reducer';
import Dialogs from './Dialogs';
import withAuthRedirect from '../HOC/WithAuthRedirect';
import { compose } from 'redux';

let mapStateToProps = (state) => {
  return {
    messagesPage: state.messagesPage,
  }
};

export default compose(connect(mapStateToProps, { addMessage }),
  withAuthRedirect)(Dialogs)