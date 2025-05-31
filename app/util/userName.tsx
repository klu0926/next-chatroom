const marker = '-^&id'

export function createUserName(userName: string){
    const randomNumber = Math.floor(Math.random() * 100000)
    return `${userName}${marker}${randomNumber}`
}

export function getDisplayUserName(userName: string): string{
  const endIndex = userName.indexOf(marker)
  if (endIndex === -1) return userName
  return userName.substring(0, endIndex)
}