import Link from "next/link";

export default function Home() {
  return (
    <div className="flex mt-24 justify-center w-full" >
      <div className="w-full max-w-3xl mx-auto text-center">
       <h1 className="text-4xl font-bold my-2">Welcome Chat</h1>

       <Link href="/chat">
          <button className="bg-blue-500 text-white px-4 py-2 rounded my-2 cursor-pointer hover:bg-blue-400">
            Start Chat
          </button>
      </Link>
      </div>
    </div>
  );
}
