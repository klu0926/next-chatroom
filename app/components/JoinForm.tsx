'use client'
import React,  {useRef, useState} from 'react'

const JoinForm = ({onJoinRoom} : {
  onJoinRoom: (userName : string) => void ,
}
) => {

  const [errorMessage, setErrorMessage] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) =>{
    e.preventDefault()
    if (!inputRef.current) return
    const userName = inputRef.current.value.trim()
    if (userName === '') {
      setErrorMessage("Please enter username")
      return
    }
    onJoinRoom(userName)
  }

  return (
    <div className='flex flex-col justify-center'>
      <h1 className='mb-4 text-3xl font-bold text-center text-pink-500'>Join Chat Room</h1>
    <form 
    className='flex flex-col'
    onSubmit={handleSubmit}
    >
          <input type="text"
          ref={inputRef}
          placeholder='Enter username'
          className="w-65 px-4 py-2 mb-2 border-2 border-pink-200 rounded-lg bg-white focus:border-pink-400 focus:outline-none"
          />
          <button
          type='submit'
          className="font-bold bg-pink-400 text-white px-4 py-2 rounded my-3 cursor-pointer w-full drop-shadow-lg hover:bg-pink-500 hover:scale-99 transition ease-in-out"
          >
            Chat
          </button>
          <p className='text-red-500 text-center mt-2'>{errorMessage}</p>
      </form>
    </div>
   
  )
}

export default JoinForm