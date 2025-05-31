import React, {useRef, useEffect} from 'react'

type ChatRoomProps = {
  children : React.ReactNode,
  messages: {sender: string, message: string}[]
}

const ChatRoom = ({children, messages} : ChatRoomProps) => {

  const divRef = useRef<HTMLDivElement>(null)

  // scroll the div when have new messages
  useEffect(() => {
    divRef.current?.scrollTo({
      top: divRef.current.scrollHeight,
      behavior: 'smooth',    
    })
  }, [messages]) 


  return (
  <div 
  className="h-[500px] overflow-y-auto p-4 bg-gray-200 rounded-lg"
  ref={divRef}
  >
        {children}
  </div>  )
}

export default ChatRoom