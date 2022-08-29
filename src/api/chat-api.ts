import { StatusType } from "../state/chat-reducer"


let subscribers = {
  'messages-received': [] as SubscriberType[],
  'status-changed': [] as StatusChangedSubscriberType[]
} 

type EventNameType = `messages-received` | `status-changed`

let ws: WebSocket | undefined

const closeHandler = () => {
  console.log('Ws close')
  notifySubscribersAboutStatus("pending")
  setTimeout(createChanel, 3000)
}
const messageHandler = (e: MessageEvent) => {
  const newMessage = JSON.parse(e.data)
  subscribers[`messages-received`].forEach((s) => s(newMessage))
}
const openHandler = () => {
  notifySubscribersAboutStatus("ready")
}
const errorHandler = () => {
  notifySubscribersAboutStatus("error")
}
const cleanUp = () => {
  ws !== undefined && ws.removeEventListener('close', closeHandler)
  ws !== undefined && ws.removeEventListener('message', messageHandler)
  ws !== undefined && ws.removeEventListener('open', openHandler)
  ws !== undefined && ws.removeEventListener('error', errorHandler)
  ws !== undefined && ws.close()
}
const notifySubscribersAboutStatus = (status: StatusType) => {
  subscribers["status-changed"].forEach(s => s(status))
}
function createChanel() {
  cleanUp()
  ws = new WebSocket(`wss://social-network.samuraijs.com/handlers/ChatHandler.ashx`)
  notifySubscribersAboutStatus('pending')
  ws !== undefined && ws.addEventListener('close', closeHandler)
  ws !== undefined && ws.addEventListener('message', messageHandler)
  ws !== undefined && ws.addEventListener('open', openHandler)
  ws !== undefined && ws.addEventListener('error', errorHandler)
}

export const chatApi = {
  start() {
    createChanel()
  },
  stop() {
    subscribers["messages-received"] = []
    subscribers["status-changed"] = []
    cleanUp()
  },
  subscribe(eventName: EventNameType,callback: SubscriberType | StatusChangedSubscriberType) {
    //@ts-ignore
    subscribers[eventName].push(callback)
    return () => {
      //@ts-ignore
      subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    }
  },
  unsubscribe(eventName: EventNameType, callback: SubscriberType | StatusChangedSubscriberType) {
    //@ts-ignore
    subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
  },
  sendMessage(message: string) {
    ws !== undefined && ws.send(message)
  }
}

type SubscriberType = (messages: MessageType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void
export type MessageType = {
  message: string | null
   photo: string | null
   userId: number | null
   userName: string | null
}