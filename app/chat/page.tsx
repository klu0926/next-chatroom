'use client'

import React from 'react'
import ChatForm from '../components/ChatForm'
import ChatRoom from '../components/ChatRoom'
import ChatMessage from '../components/ChatMessage'
import JoinForm from '../components/JoinForm'
import { useState, useEffect, useCallback } from 'react'
import { pusherClient } from "@/lib/pusher-client";

export default function ChatPage() {

  const [joined, setJoined] = useState(false)
  const [joinError, setJoinError] = useState("")

  // ChatRoom
  const [messages, setMessages]= useState<
  {sender: string, message: string}[]>([]);
  const [userName, setUserName] = useState("")


    // -------- FUNCTIONS
  // Use in JoinForm

  // Use in JoinForm
  function handleJoinRoom(userName : string){
    // check has username
    if (userName.trim() === "") {
      // set error message to join form
      setJoinError("Please enter username")
      return
    }
    setJoinError("")
    setUserName(userName)
    setJoined(true) // joined
  }

  const handleSendMessage = useCallback(async (message : string, sender? : string) => {
    if (sender === "") sender = userName
    await fetch("/api/send-message", {
      method: "POST",
      body: JSON.stringify({ sender, message }),
    });
    console.log(`[SENDER] ${sender} [MESSAGE] ${message}`)
  }, [userName] );
  

  // ----- Join socket channel and listen to event
  useEffect(() => {
    if (!userName) return; // Skip if userName is empty

    // Connect to the  channel "chat"
    const channel = pusherClient.subscribe("chat");

    // [channel-level] list to "message" event
    channel.bind("message", (data: { sender: string; message: string }) => {
      // set message to all messages + current message
      setMessages(prev => [...prev, data]);
    });

    // [connection-level] state_change event
    const stateChangeHandler = (states: { previous: string; current: string }) => {
      console.log(`[PUSHER] User "${userName}" connection: ${states.previous} → ${states.current}`);
    };
    pusherClient.connection.bind("state_change", stateChangeHandler);

    // Channel subscripted
    channel.bind('pusher:subscription_succeeded', async function() {
      console.log(`${userName} subscription_succeeded`)

      handleSendMessage(`${userName} has connected`, "system")
    });
    
    // [connection-level] error event
    const errorHandler = (err: Error) => {
      console.error(`[PUSHER] User "${userName}" error:`, err);
    };
    pusherClient.connection.bind("error", errorHandler);

    return () => {
      // Clean up things one by one
      channel.unbind_all(); // remove channel events
      channel.unsubscribe(); // discconect channel

      // unbind connection level event
      pusherClient.connection.unbind("state_change", stateChangeHandler);  // remove this connection event
      pusherClient.connection.unbind("error", errorHandler);

    };
  }, [userName, handleSendMessage]);

  return (
    <div className="flex mt-24 justify-center w-full " >
      {!joined ? (
        <JoinForm
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
         <ChatForm 
         onSendMessage={handleSendMessage}/>
        </div>)
      }

    </div>
  )
}