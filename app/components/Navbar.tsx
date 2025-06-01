import Link from 'next/link'

export default function Navbar() {


  return (

    <div className="min-w-screen px-10 py-2 bg-pink-400 flex justify-start gap-2">
      <Link href={"/"} className='font-bold text-white rounded py-1 px-2 text-sm hover:bg-pink-50 hover:text-pink-400'>Home</Link>
      <Link href={"/chat"} className='font-bold text-white rounded py-1 px-2 text-sm hover:bg-pink-50 hover:text-pink-400'>Chatroom</Link>
    </div>
  )
}