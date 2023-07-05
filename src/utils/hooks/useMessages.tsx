import { createContext, ReactNode, useContext, useState } from 'react'

import { clearMessage } from '@slices/appSlice'
import { IMessageType } from '@tstypes/messages'

import { useAppDispatch } from '@/redux/hooks'

const MessagesContext = createContext({
  message: null,
  addMessage: null,
  removeMessage: null,
})

export const MessagesProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState(null)
  const dispatch = useAppDispatch()

  const addMessage = (newMessage: IMessageType) => {
    setMessage(newMessage)
  }

  const removeMessage = () => {
    setMessage(null)
    dispatch(clearMessage())
  }

  return (
    <MessagesContext.Provider value={{ message, addMessage, removeMessage }}>
      {children}
    </MessagesContext.Provider>
  )
}

export const useMessages = () => useContext(MessagesContext)
