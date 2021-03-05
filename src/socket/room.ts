
import { v4 } from 'uuid'

import { AttributesRoom, Room, Message, User } from './@types'



export default function createRoom( name: string, limit: number ): Room {
  const attributes: AttributesRoom = {
    id: v4(),
    name: name,
    limit: Number(limit) || 5,
    connected: 0,
    messeges: [],
    users: []
  }


  const enterRoom = (user: User) => {
    if( attributes.connected < attributes.limit ) {
      attributes.connected += 1
      attributes.users.push(user)
    }
  }

  const leaveRoom = (user: User) => {
    console.log( leaveRoom, user.id )

    attributes.connected -= 1

    const index = attributes.users
      .findIndex( current_user => current_user.id === user.id )

    attributes.users.splice(index, 1)
  }


  const addMessage = (message: Message) => {
    attributes.messeges.push(message)
  }

  const getMessages = () =>
    attributes.messeges


  const addUser = ( id: string, author: string ) => {
    if( attributes.connected !== limit ) {
      attributes.users.push({ 
        id,
        author
      })
    } 
  }



  const getName = () => attributes.name

  const allowedConnection  = () =>
    attributes.connected < attributes.limit



  return {
    getName,
    addUser,
    enterRoom,
    addMessage,
    getMessages,
    leaveRoom,
    allowedConnection,
    attributes
  }
}
