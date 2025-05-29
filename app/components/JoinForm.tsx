'use client'
import React, { useState } from 'react'

const JoinForm = ({onUserNameChange, onJoinRoom, errorMessage} : {
  onUserNameChange : (name: string) => void,
  onJoinRoom: (e: React.FormEvent) => void ,
  errorMessage : string
}
) => {

  return (
    <div className='flex flex-col justify-center'>
      <h1 className='mb-4 text-2xl font-bold text-center'>Join Chat Room</h1>
    <form className='flex flex-col'>
          <input type="text"
          placeholder='Enter username'
          onChange={(e) => onUserNameChange(e.target.value)}
          className="w-65 px-4 py-2 mb-4 border-1 rounded-lg"
          />
          <button
          type='submit'
          className='px-4 py-2 text-white bg-blue-500 rounded-lg font-bold
          hover:bg-blue-400 cursor-pointer
          '
            onClick={onJoinRoom}
          >
            Chat
          </button>
          <p className='text-red-500 text-center mt-2'>{errorMessage}</p>
      </form>
    </div>
   
  )
}

export default JoinForm