'use client'
import React,  {useRef} from 'react'

const JoinForm = ({onJoinRoom, errorMessage} : {
  onJoinRoom: (userName : string) => void ,
  errorMessage : string
}
) => {

  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) =>{
    e.preventDefault()
    if (!inputRef.current) return
    const userName = inputRef.current.value.trim()
    if (userName === '') return
    onJoinRoom(userName)
  }

  return (
    <div className='flex flex-col justify-center'>
      <h1 className='mb-4 text-2xl font-bold text-center'>Join Chat Room</h1>
    <form 
    className='flex flex-col'
    onSubmit={handleSubmit}
    >
          <input type="text"
          ref={inputRef}
          placeholder='Enter username'
          className="w-65 px-4 py-2 mb-4 border-1 rounded-lg"
          />
          <button
          type='submit'
          className='px-4 py-2 text-white bg-blue-500 rounded-lg font-bold
          hover:bg-blue-400 cursor-pointer
          '
          >
            Chat
          </button>
          <p className='text-red-500 text-center mt-2'>{errorMessage}</p>
      </form>
    </div>
   
  )
}

export default JoinForm