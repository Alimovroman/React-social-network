import { NavLink } from 'react-router-dom';
import classes from './Dialogs.module.css';
import DialogsUser from './DialogsUser/DialogsUser';
import Messages from './Messages/Messages';
import React from 'react';

const Dialogs = (props) => {
  let dialogItem = props.state.dialogsData.map(dialog => <DialogsUser name={dialog.name} id={dialog.id} />);
  let messageItem = props.state.messagesData.map(message => <Messages message={message.message} />)

  let newMassageElement = React.createRef();
  const addMessage = () => {
    let text = newMassageElement.current.value;
    alert(text)
  }
  return (
    <div className={classes.dialogWindow}>
      <div className={classes.dialogsUser}>
        {dialogItem}
      </div>
      <div className={classes.messages}>
        {messageItem}
        <div>
          <textarea ref={newMassageElement} cols='40' rows='3'></textarea>
          <div>
            <button onClick={addMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Dialogs;