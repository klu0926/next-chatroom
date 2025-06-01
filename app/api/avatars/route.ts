import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function GET(){

  // Send back a random image
  const avatarDir = path.join(process.cwd(), 'public/avatar')
  const files = fs.readdirSync(avatarDir)
  console.log(files)
  const randomAvatar = files[Math.floor(Math.random() * files.length)]

  return NextResponse.json(`/avatar/${randomAvatar}`)
}