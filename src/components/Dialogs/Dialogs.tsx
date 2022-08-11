import classes from './Dialogs.module.css';
import DialogsUser from './DialogsUser/DialogsUser';
import Messages from './Messages/Messages';
import React, { FC } from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { reduxForm } from 'redux-form';
import { Textarea } from '../common/Preloader/FormControl';
import { maxLengthCreator, required } from '../../utils/validator';
import { DialogsDataType, MessagesDataType } from '../../state/message-reducer';

const maxLength50 = maxLengthCreator(50);

let NewMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
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

const NewMessageReduxForm = reduxForm<FormDataType>({form: `newMessage`})(NewMessageForm)

type PropsType = {
  messages: MessagesDataType[]
  dialogs: DialogsDataType[]
  addMessage: (message: string) => void
}

type FormDataType = {
  newMessage: string
}

const Dialogs: FC<PropsType> = ({messages, dialogs, addMessage}) => {
  let dialogItem = dialogs.map(dialog => <DialogsUser key={dialog.id} name={dialog.name} id={dialog.id} />);
  let messageItem = messages.map(message => <Messages key={message.id} message={message.message} />)

  const addMessageForm = (formData: FormDataType) => {
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
          <NewMessageReduxForm onSubmit={addMessageForm}/>
        </div>
      </div>
    </div>
  )
};

export default Dialogs;