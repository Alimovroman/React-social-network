import classes from './Dialogs.module.css';
import DialogsUser from './DialogsUser/DialogsUser';
import Messages from './Messages/Messages';
import React, { FC } from 'react';
import { Field } from 'redux-form';
import { reduxForm } from 'redux-form';
import { Textarea } from '../common/Preloader/FormControl';
import { maxLengthCreator, required } from '../../utils/validator';
import { DialogsDataType, MessagesDataType } from '../../state/message-reducer';

const maxLength50 = maxLengthCreator(50);

let NewMessage = (props: any) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={Textarea} validate={[required, maxLength50]} name='newMessage' placeholder='Enter new message' />
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  )
};
//@ts-ignore
NewMessage = reduxForm({form: `newMessage`})(NewMessage)

type PropsType = {
  messages: MessagesDataType[]
  dialogs: DialogsDataType[]
  addMessage: (newMessage: string) => void
}

const Dialogs: FC<PropsType> = ({messages, dialogs}) => {
  let dialogItem = dialogs.map(dialog => <DialogsUser key={dialog.id} name={dialog.name} id={dialog.id} />);
  let messageItem = messages.map(message => <Messages key={message.id} message={message.message} />)

  const addMessage = (formData: any) => {
    addMessage(formData.newMessage)
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