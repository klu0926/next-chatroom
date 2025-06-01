'use client'
import React, { useState, useRef } from "react"


const ChatForm = ({
  // Let parent know the message (to display it)
  onSendMessage, 
  avatar
} : {
   onSendMessage: (message : string, sender : string, avatar: string) => void,
   avatar : string
  }) => {
  // form message
  const [message, setMessage] = useState("")

  const inputRef = useRef<HTMLInputElement>(null)


  // Handle form subbmit
  const handleSubbmit= (e:React.FormEvent) => {
    e.preventDefault()
    if (message.trim() !== ""){
      onSendMessage(message, "", avatar)  
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
       className="w-full px-4 py-2 border-2 border-pink-200 rounded-lg bg-white focus:border-pink-400 focus:outline-none"
       placeholder='Message here...' />
       <button 
       className="px-4 py-2 text-white rounded-lg bg-pink-400 hover:bg-pink-500 hover:scale-95 transition ease-in-out cursor-pointer shadow-lg"
       type="submit"
       >Send</button>
    </form>
  )
}

export default ChatForm