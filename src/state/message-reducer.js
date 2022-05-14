const ADD_MESSAGE = 'ADD-MESSAGE';

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
}

const messageReducer = (state=initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE: 
      let newMessage = {
        id: 7, message: action.newText
      };
      return {
        ...state,
        messagesData: [...state.messagesData, newMessage],
      };
  
    default:
      return state;
  }
};

export const addMessage = (text) => ({type: ADD_MESSAGE, newText: text});

export default messageReducer;