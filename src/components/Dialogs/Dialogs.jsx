import { NavLink } from 'react-router-dom';
import classes from './Dialogs.module.css';
import DialogsUser from './DialogsUser/DialogsUser';
import Messages from './Messages/Messages';

const Dialogs = (props) => {

  let dialogItem = props.state.dialogsData.map(dialog => <DialogsUser name={dialog.name} id={dialog.id} />);

  let messageItem = props.state.messagesData.map(message => <Messages message={message.message}/>)

  return (
    <div className={classes.dialogWindow}>
 
      <div className={classes.dialogsUser}>
        {dialogItem}
      </div>
       <div className={classes.messages}>
         {messageItem}
      </div>
    </div>
  )
};

export default Dialogs;