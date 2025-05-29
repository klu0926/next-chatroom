'use client'

import React from 'react'
import ChatForm from '../components/ChatForm'
import ChatRoom from '../components/ChatRoom'
import ChatMessage from '../components/ChatMessage'
import JoinForm from '../components/JoinForm'
import { useState } from 'react'


export default function ChatPage() {

  const [room, setRoom] = useState("123")

  // join form
  const [joined, setJoined] = useState(false)
  const [joinError, setJoinError] = useState("")

  // ChatRoom
  const [messages, setMessages]= useState<
  {sender: string, message: string}[]>([]);
  const [userName, setUserName] = useState("")

  // Use in JoinForm
  function handleUserNameChange(name: string){
    setUserName(name)
  }

  // Use in JoinForm
  function handleJoinRoom(e: React.FormEvent){
    e.preventDefault()

    // check has username
    if (userName.trim() === "") {
      // set error message to join form
      setJoinError("Please enter username")
      return
    }
    // For now all join the same room '123'
    alert(`user: ${userName} joined the room`)
    setJoinError("")
    setJoined(true)
  }

  function handleSendMessage(message : string){
    //  does thingthing
    console.log("onSendMessage:", message)
  }
  return (
    <div className="flex mt-24 justify-center w-full " >
      {!joined ? (
        <JoinForm
        onUserNameChange={handleUserNameChange}
        onJoinRoom={handleJoinRoom}
        errorMessage={joinError}
        ></JoinForm> 
      ) : 
      ( <div className="w-full max-w-3xl mx-auto">
        <h1 className="mb-4 text-2xl font-bold">Room: 1</h1>
        <ChatRoom>
        {messages.map((m, index) => (
          <ChatMessage
            key={index}
            sender={m.sender}
            message={m.message}
            isOwnMessage={m.sender === userName}
          />
        ))}
        </ChatRoom>
         <ChatForm onSendMessage={handleSendMessage}/>
        </div>)
      }

    </div>
  )
}