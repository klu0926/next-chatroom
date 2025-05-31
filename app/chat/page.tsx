'use client'

import React from 'react'
import ChatForm from '../components/ChatForm'
import ChatRoom from '../components/ChatRoom'
import ChatMessage from '../components/ChatMessage'
import JoinForm from '../components/JoinForm'
import { useState, useEffect, useCallback } from 'react'
import { pusherClient } from "@/lib/pusher-client";
import { createUserName, getDisplayUserName} from '../util/userName'

export default function ChatPage() {

  const [joined, setJoined] = useState(false)
  const [joinError, setJoinError] = useState("")

  // ChatRoom
  const [messages, setMessages]= useState<
  {sender: string, message: string}[]>([]);
  const [userName, setUserName] = useState("")


    // -------- FUNCTIONS
  // Use in JoinForm
  function handleJoinRoom(userName : string){
    // check has username
    if (userName.trim() === "") {
      // set error message to join form
      setJoinError("Please enter username")
      return
    }

    // Create unique userName
    setJoinError("")
    setUserName(createUserName(userName))
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

    // Channel subscripted (join room)
    channel.bind('pusher:subscription_succeeded', async function() {
      console.log(`${userName} subscription_succeeded`)
      handleSendMessage(`${getDisplayUserName(userName)} appeared.`, "system")
    });
    
    // [connection-level] error event
    const errorHandler = (err: Error) => {
      console.error(`[PUSHER] User "${userName}" error:`, err);
    };
    pusherClient.connection.bind("error", errorHandler);

    return () => {
      // exit message
      (async () => {
        await handleSendMessage(`${getDisplayUserName(userName)} vanished`, "system");
      })();

      // Clean up things one by one
      channel.unbind_all(); // remove all events
      channel.unsubscribe(); // discconect channel

      // unbind connection level event
      pusherClient.connection.unbind("error", errorHandler);
    };
  }, [userName, handleSendMessage]);


  // For user leaving
  useEffect(() => {
    if (!joined || !userName) return
    const handleUnload  = () => {
      // create payload
      const payload = {
        sender : "system",
        message : `${getDisplayUserName(userName)} vanished`
      }
      // send a beacon to send a message to the channel
      navigator.sendBeacon(
        "/api/send-message",
        new Blob([JSON.stringify(payload)], { type: "application/json" })
      )
    }

    // Listen to page unload
    window.addEventListener("beforeunload",  handleUnload)
    
    // clearn up
    return () => {
      window.removeEventListener("beforeunload", handleUnload)
    }
  }, [joined, userName])


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
        <ChatRoom 
        messages={messages}
        >
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