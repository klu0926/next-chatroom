import React from 'react'

const ChatRoom = ({children} : {children: React.ReactNode}) => {

  return (
  <div className="h-[500px] overflow-y-auto p-4 bg-gray-200 rounded-lg">
        {children}
  </div>  )
}

export default ChatRoom