import React from 'react'
import { getDisplayUserName } from '../util/userName'

interface ChatMessageProps {
  sender : string
  message : string
  isOwnMessage: boolean 
}

const ChatMessage = ({sender, message, isOwnMessage} : ChatMessageProps) => {

  // Check if is system message
  const isSystemMessage = sender === 'system'

  return (
    <div
      className={`flex ${
        isSystemMessage 
        ? "justify-center"
        : isOwnMessage 
        ? "justify-end" 
        : "justify-start"
      } mb-1}`}
    >
      {/* control color */}
      <div className={`
        max-w-xs px-4 
        `}>
        <div className={`max-w-xs px-4 py-2 rounded-lg`}>
          {/* sender name */}
          {!isSystemMessage && !isOwnMessage && <p className='text-sm font-bold py-1'>{getDisplayUserName(sender)}</p>}
           {/* message */}
          <p className={`
            px-4 py-1 rounded-lg break-words
            ${isSystemMessage 
              ? "bg-gray-800 text-white text-center text-xs py-2" 
              : isOwnMessage
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
            }
            `}>{message}</p>
        </div>
      </div>
      </div>
  )
}

export default ChatMessage