import { NavLink } from 'react-router-dom';
import classes from './Dialogs.module.css';

const DialogsUser = (props) => {
  return (
    <div className={classes.dialog}>
      <NavLink to={'/dialogs/'+props.id}>{props.name} </NavLink>
    </div>
  )
}

const Messages = (props) => {
  return (
    <div>
      {props.message}
    </div>
  )

}

const Dialogs = (props) => {
  
  let dialogsData = [
    {id: 1,  name: 'Alexander'},
    {id: 2,  name: 'Pusya'},
    {id: 3,  name: 'Chucha'},
    {id: 4,  name: 'Kolya'},
    {id: 5,  name: 'Terenazavr'},
    {id: 6,  name: 'SuperMan'}
  ]

  let messagesData = [
    {id: 1, message: 'Hello'},
    {id: 2, message: 'How are you?'},
    {id: 3, message: 'I like to sing in shower'},
    {id: 4, message: 'i`m really hungry'},
  ]

  return (
    <div className={classes.dialogWindow}>
      <div className={classes.dialogsUser}>
        <DialogsUser name={dialogsData[0].name} id={dialogsData[0].id} />
        <DialogsUser name={dialogsData[1].name} id={dialogsData[1].id} />
        <DialogsUser name={dialogsData[2].name} id={dialogsData[2].id} />
        <DialogsUser name={dialogsData[3].name} id={dialogsData[3].id} />
        <DialogsUser name={dialogsData[4].name} id={dialogsData[4].id} />
        <DialogsUser name={dialogsData[5].name} id={dialogsData[5].id} />
      </div>
      <div className={classes.messages}>
        <Messages message={messagesData[0].message}/>
        <Messages message={messagesData[1].message}/>
        <Messages message={messagesData[2].message}/>
        <Messages message={messagesData[3].message}/>
      </div>
    </div>
  )
};

export default Dialogs;