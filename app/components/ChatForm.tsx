'use client'
import React, { useState, useRef } from "react"


const ChatForm = ({
  // Let parent know the message (to display it)
  onSendMessage, 
} : {
   onSendMessage: (message : string, sender : string) => void
  }) => {
  // form message
  const [message, setMessage] = useState("")

  const inputRef = useRef<HTMLInputElement>(null)


  // Handle form subbmit
  const handleSubbmit= (e:React.FormEvent) => {
    e.preventDefault()
    if (message.trim() !== ""){
      onSendMessage(message, "")  
      setMessage("")
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }
 
  return (
    <form className='flex gap-2 mt-4' onSubmit={handleSubbmit}>
      <input 
      ref={inputRef}
       type="text" 
       onChange={(e) => setMessage(e.target.value)}
       className="flex-1 px-4 border-1 py-2 rounded-lg focus:outline-none"
       placeholder='Message here...' />

       <button 
       className="px-4 py-2 text-white rounded-lg bg-blue-500 hover:bg-blue-400 cursor-pointer"
       type="submit"
       >Send</button>
    </form>
  )
}

export default ChatForm