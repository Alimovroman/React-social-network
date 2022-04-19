const ADD_MESSAGE = 'ADD-MESSAGE';
const CHANGE_MESSAGE_TEXT = 'CHANGE-MESSAGE-TEXT';

let initialState = {
  messagesData: [
    {id: 1, message: 'Hello'},
    {id: 2, message: 'How are you?'},
    {id: 3, message: 'I like to sing in shower'},
    {id: 4, message: 'i`m really hungry'},
  ],
  dialogsData: [
    {id: 1,  name: 'Alexander'},
    {id: 2,  name: 'Pusya'},
    {id: 3,  name: 'Chucha'},
    {id: 4,  name: 'Kolya'},
    {id: 5,  name: 'Terenazavr'},
    {id: 6,  name: 'SuperMan'}
  ],
  newMessageText: ''
}

const messageReducer = (state=initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      let newMessage = {
        id: 7, message: action.newText
      };
      state.messagesData.push(newMessage);
      state.newMessageText = '';
      return state;

    case CHANGE_MESSAGE_TEXT:
      state.newMessageText = action.text;
      return state;

    default:
      return state;
  }
};

export const addMessageActionCreator = (text) => ({type: ADD_MESSAGE, newText: text});
export const onMessageChangeActionCreator = (newText) => {
  return {
    type: CHANGE_MESSAGE_TEXT, text: newText
  }
};

export default messageReducer;