import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkAction } from "redux-thunk"
import { chatApi, MessageType } from "../api/chat-api"
import { InferActionsType, RootState } from "./redux-store"

export type StatusType = `pending` | 'ready' | 'error'

const initialState = {
  messages: [] as MessageType[],
  status: 'pending' as StatusType
}

type InitialStateType = typeof initialState
type ActionType = InferActionsType<typeof actionsChat>

const chatReducer = (state = initialState, action: ActionType): InitialStateType => {
  switch(action.type) {
    case "CHAT_REDUCER/MESSAGES_RECEIVED":
      return {
        ...state,
        messages:  [...state.messages, ...action.payload].filter((m, index, array) => index >= array.length - 50)
      }
    case 'CHAT_REDUCER/CHANGE_STATUS':
      return {
        ...state,
        status: action.payload
      }
    default: 
      return state
  }
}

const actionsChat = {
  messagesReceived: (message: MessageType[]) => ({type: 'CHAT_REDUCER/MESSAGES_RECEIVED', payload: message } as const),
  changeStatus: (status: StatusType) => ({type: 'CHAT_REDUCER/CHANGE_STATUS', payload: status} as const)
}

let _newMessagehandler: ((messages: MessageType[]) => void) | null =  null
const newMessageHandlerCreator =(dispatch: Dispatch) => {
  if(_newMessagehandler === null) {
    _newMessagehandler = (messages) => {
      dispatch(actionsChat.messagesReceived(messages))
    }
  }
  return _newMessagehandler
}
let _statusChangedHandler: ((status: StatusType) => void) | null =  null
const statusChangedHandlerCreator =(dispatch: Dispatch) => {
  if(_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(actionsChat.changeStatus(status))
    }
  }
  return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => {
  return async (dispatch) => {
    chatApi.start()
    chatApi.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatApi.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
  }
}
export const stopMessagesListening = (): ThunkType => {
  return async (dispatch) => {
    chatApi.stop()
    chatApi.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatApi.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
  }
}
export const sendMessage = (message: string): ThunkType=> {
  return async (dispatch) => {
    chatApi.sendMessage(message)
  }
}
type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionType>
export default chatReducer