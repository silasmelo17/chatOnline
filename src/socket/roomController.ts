
import createRoom from './room'
import { Room, RoomController, AttributesRoom, User, Message } from './@types'



export default function roomsController (): RoomController {
  const rooms: Room[] = []


  const addRoom = ( name: string, limit: number ) => {
    const room = createRoom( name, limit )
    rooms.push( room )
  }

  const getRoom = (name: string) => rooms
    .find( room => room.getName() === name)

  const getRooms = (): AttributesRoom[] => 
    rooms.map( room => room.attributes )

  const someRoom = (name: string): boolean => rooms
    .some( room => room.getName() === name )



  const enterRoom = ( name: string, user: User ) => {
    const room = getRoom(name)
    if(room !== undefined) 
      room.enterRoom(user)
  }

  const leaveRoom = ( name: string, user: User ) => {
    const room = getRoom(name)
    if(room !== undefined) 
      room.leaveRoom(user)
  }



  const getMessages = (name: string): Message[] => {
    const room = getRoom(name)
    if(room !== undefined)
      return room.getMessages()
    return []
  }

  const addMessage = ( name: string, message: Message ) => {
    const room = getRoom(name)
    if(room !== undefined) 
      room.addMessage(message)
  }



  const addUser = ( name_room: string, socket_id: string, author: string ) => {
    const room = getRoom(name_room)
    if(room !== undefined) 
      room.addUser( socket_id, author )
  }



  const allowedConnection = (name: string): boolean => {
    const room = getRoom(name)
    if( room !== undefined )
      return room.allowedConnection()
    return false
  }



  return {
    addRoom,
    addUser,
    addMessage,
    someRoom,
    getMessages,
    getRooms,
    enterRoom,
    leaveRoom,
    allowedConnection
  }
}
