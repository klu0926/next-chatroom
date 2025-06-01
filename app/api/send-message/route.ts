import { pusherServer } from "@/lib/pusher-server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest){
  const {sender, message, avatar} = await req.json()


  // trigger(chanel, event, data)
  // Send message 
  await pusherServer.trigger("chat", "message", {
    sender, 
    message,
    avatar
  })

  return new Response("Message send", {
    status: 200
  })
}