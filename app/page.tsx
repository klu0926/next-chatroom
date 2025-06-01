import Link from "next/link";
import Image from 'next/image'
import {  Lobster } from "next/font/google";

const lobster = Lobster({
  weight: "400",
})


export default function Home() {
  return (
    <div className="flex justify-center min-w-screen min-h-screen bg-pink-50">
      <div className="flex flex-col justify-start items-center w-full mt-60">
        <div className="flex gap-2 mb-4">
          <h1 className={`text-6xl font-bold text-pink-500 mt-2 ${lobster.className}`}>Chatterly</h1>
            <Image
              src="/logo4.png"
              alt="Logo"
              width={65}
              height={50}
              className="animate-bounce"
            />
        </div>
     
      <p className="font-bold text-pink-400">Chat. Connect. Fall in love.</p>
       <Link href="/chat">
          <button className="font-bold bg-pink-400 text-white px-4 py-2 rounded my-3 cursor-pointer w-50 drop-shadow-lg hover:bg-pink-500 hover:scale-99 transition ease-in-out">
            Start Chat
          </button>
      </Link>
      </div>
    </div>
  );
}
