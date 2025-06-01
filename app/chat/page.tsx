'use client'

import React from 'react'
import ChatForm from '../components/ChatForm'
import ChatRoom from '../components/ChatRoom'
import ChatMessage from '../components/ChatMessage'
import JoinForm from '../components/JoinForm'
import { useState, useEffect, useCallback } from 'react'
import { pusherClient } from "@/lib/pusher-client";
import { createUserName, getDisplayUserName} from '../util/userName'
import Image from 'next/image'

export default function ChatPage() {

  const [joined, setJoined] = useState(false)

  // ChatRoom
  const [messages, setMessages]= useState<
  {sender: string, message: string}[]>([]);
  const [userName, setUserName] = useState("")
  const [avatar, setAvatar] = useState("")


    // -------- FUNCTIONS
  // Use in JoinForm
  function handleJoinRoom(userName : string){
    setUserName(createUserName(userName))
    setJoined(true) // joined
  }

  const handleSendMessage = useCallback(async (message : string, sender? : string, avatar? : string) => {
    if (sender === "") sender = userName

    await fetch("/api/send-message", {
      method: "POST",
      body: JSON.stringify({ sender, message, avatar }),
    });
  }, [userName] );

  // ----- Get a random avatar
  useEffect( () => {
    const fetchAvatarPath = async ()=> {
      const response = await fetch("/api/avatars")
      const path = await response.json()
      setAvatar(path)
    }

    fetchAvatarPath()
  }, [])


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
      handleSendMessage(`${getDisplayUserName(userName)} appeared`, "system")
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
    <div className="flex justify-center items-start min-w-screen min-h-screen bg-pink-50" >
      {!joined ? (
        <div className='mt-55'>
         <JoinForm
        onJoinRoom={handleJoinRoom}
        ></JoinForm>
        </div>
      ) : 
      ( <div className="w-full max-w-3xl mx-auto p-5">
        <div className='flex gap-2 w-full justify-center'>
            <div>
              <Image
                  src={avatar}
                  alt="avatar"
                  width={35}
                  height={35}  
                />
            </div>
            <h1 className="mb-4 text-2xl text-pink-400 font-bold">{getDisplayUserName(userName)}</h1>
        </div>

        <ChatRoom 
        messages={messages}
        >
        {messages.map((m, index) => (
          <ChatMessage
            key={index}
            sender={m.sender}
            message={m.message}
            avatar={m.avatar}
            isOwnMessage={m.sender === userName}
          />
        ))}
        </ChatRoom>
         <ChatForm 
         avatar={avatar}
         onSendMessage={handleSendMessage}/>
        </div>)
      }

    </div>
  )
}