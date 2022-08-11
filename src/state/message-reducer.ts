import { InferActionsType } from "./redux-store";

export type MessagesDataType = {
  id: number,
  message: string
}
export type DialogsDataType = {
  id: number,
  name: string
}
type InitialStateType = {
  messagesData: MessagesDataType[],
  dialogsData: DialogsDataType[]
}

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

type ActionType = InferActionsType<typeof actionsMessage>

const messageReducer = (state=initialState, action: ActionType): InitialStateType => {
  switch (action.type) {
    case "MESSAGES/ADD-MESSAGE": 
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

export const actionsMessage = {
  addMessage : (text: string) => ({type: 'MESSAGES/ADD-MESSAGE', newText: text} as const )
}


export default messageReducer;