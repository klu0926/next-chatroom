import React from 'react'
import { getDisplayUserName } from '../util/userName'
import Image from 'next/image'

interface ChatMessageProps {
  sender : string
  message : string
  avatar?: string
  isOwnMessage: boolean 
}

const ChatMessage = ({sender, message,avatar, isOwnMessage} : ChatMessageProps) => {

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
        <div className={`max-w-xs px-1 py-2 rounded-lg`}>
          {/* sender name */}
          {!isSystemMessage && !isOwnMessage && <div className='flex gap-1 items-center text-blue-500 text-sm font-bold py-1'>
            
            {
              avatar && <div>
              <Image
                src={avatar}
                alt="avatar"
                width={25}
                height={25}  
              />
               </div>

            }
            {getDisplayUserName(sender)}</div>}
           {/* message */}
          <p className={`
            px-4 py-1 rounded-lg break-words 
            ${isSystemMessage 
              ? "bg-pink-300 text-white text-center text-xs py-2" 
              : isOwnMessage
              ? "bg-pink-500 text-white shadow-mb"
              : "bg-blue-500 text-white shadow-mb"
            }
            `}>{message}</p>
        </div>
      </div>
      </div>
  )
}

export default ChatMessage