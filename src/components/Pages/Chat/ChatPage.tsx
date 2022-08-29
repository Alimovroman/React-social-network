import { Button, message } from "antd"
import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { Action } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { MessageType } from "../../../api/chat-api"
import { sendMessage, startMessagesListening, stopMessagesListening } from "../../../state/chat-reducer"
import { RootState } from "../../../state/redux-store"




const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  )
}

const Chat: React.FC = () => {
  const status = useSelector((state: RootState) => state.chat.status)
  const dispatch = useDispatch<ThunkDispatch<RootState, void, Action>>()

  useEffect(() => {
    dispatch(startMessagesListening())
    return () => {
      dispatch(stopMessagesListening())
    }
  }, [])

  return (
    <div>
      {status === "error" && <div>Some Error. Please refresh page</div>}
      <Messages />
      <AddMessagesForm />
    </div>
  )
}

const Messages: React.FC = () => {
  const messages = useSelector((state: RootState) => state.chat.messages)
  let messagesRef = useRef<HTMLDivElement>(null)
  const [isAutoScroll, setIsAutoScroll] = useState(true)

  const handlerScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const container = event.currentTarget;
    if (container.offsetHeight + container.scrollTop >= container.scrollHeight) {
      setIsAutoScroll(true);
    } else {
      setIsAutoScroll(false);
    }
  }

  useEffect(() => {
    if (isAutoScroll) {
      messagesRef.current!.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isAutoScroll])

  return (
    <div style={{ height: '300px', overflow: "auto" }} onScroll={handlerScroll}>
      {messages.map((m, index) => <Message key={index} message={m} />)}
      <div ref={messagesRef}></div>
    </div>
  )
}



const Message: React.FC<{ message: MessageType }> = React.memo(({ message }) => {
  return (
    <div>
      <img style={{ width: '40px' }} src={message.photo!} alt='avatar' />
      {message.userName}
      <br />{message.message}
      <hr />
    </div>
  )
})

const AddMessagesForm: React.FC = () => {
  const [message, setMessage] = useState(``)
  const status = useSelector((state: RootState) => state.chat.status)
  const dispatch = useDispatch<ThunkDispatch<RootState, void, Action>>()

  const addMessage = () => {
    if (!message) {
      return
    } else {
      dispatch(sendMessage(message))
      setMessage('')
    }
  }
  return (
    <div>
      <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message} />
      <div>
        <Button disabled={status !== 'ready'} onClick={addMessage}>Send</Button>
      </div>

    </div>
  )
}


export default ChatPage