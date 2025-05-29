import React from 'react'

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
      } mb-3}`}
    >
      {/* control color */}
      <div className={`
        max-w-xs px-4 py-2 rounded-lg 
        ${isSystemMessage 
          ? "bg-gray-800 text-white text-center text-xs" 
          : isOwnMessage
          ? "bg-blue-500 text-white"
          : "bg-white text-black"
        }
        `}>
        <div className={`max-w-xs px-4 py-2 rounded-lg`}>
          {/* sender name */}
          {!isSystemMessage && <p className='text-sm font-bold'>{sender}</p>}
           {/* message */}
          <p>{message}</p>
        </div>
      </div>
      </div>
  )
}

export default ChatMessage