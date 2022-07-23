const ADD_MESSAGE = 'MESSAGES/ADD-MESSAGE';

type InitialStateType = {
  messagesData: {
    id: number,
    message: string
  }[],
  dialogsData: {
    id: number,
    name: string
  }[]
}

let initialState: InitialStateType = {
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

const messageReducer = (state=initialState, action: any): InitialStateType => {
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

type AddMessageActionType = {
  type: typeof ADD_MESSAGE,
  newText: string
}
export const addMessage = (text: string): AddMessageActionType => ({type: ADD_MESSAGE, newText: text});

export default messageReducer;