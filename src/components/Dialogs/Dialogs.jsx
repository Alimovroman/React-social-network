import classes from './Dialogs.module.css';
import DialogsUser from './DialogsUser/DialogsUser';
import Messages from './Messages/Messages';
import React from 'react';
import { Field } from 'redux-form';
import { reduxForm } from 'redux-form';

let NewMessage = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component='textarea' name='newMessage' placeholder='enter the text' />
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  )
};

NewMessage = reduxForm({form: `newMessage`})(NewMessage)

const Dialogs = (props) => {
  let dialogItem = props.messagesPage.dialogsData.map(dialog => <DialogsUser key={dialog.id} name={dialog.name} id={dialog.id} />);
  let messageItem = props.messagesPage.messagesData.map(message => <Messages key={message.id} message={message.message} />)

  const addMessage = (formData) => {
    props.addMessage(formData.newMessage)
    formData.newMessage = '';
  };

  return (
    <div className={classes.dialogWindow}>
      <div className={classes.dialogsUser}>
        {dialogItem}
      </div>
      <div className={classes.messages}>
        {messageItem}
        <div>
          <NewMessage onSubmit={addMessage}/>
        </div>
      </div>
    </div>
  )
};

export default Dialogs;