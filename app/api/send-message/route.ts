import { pusherServer } from "@/lib/pusher-server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest){
  const {sender, message} = await req.json()


  // trigger(chanel, event, data)
  // Send message 
  await pusherServer.trigger("chat", "message", {
    sender, 
    message
  })

  return new Response("Message send", {
    status: 200
  })
}