
const { v4: uuidv4 } = require('uuid')



function createRoom( name, limit ) {
  const attributes = {
    id: uuidv4(),
    name: name,
    limit: Number(limit) || 5,
    connected: 0,
    messeges: [],
    users: []
  }


  const enterRoom = user => {
    if( attributes.connected < attributes.limit ) {
      attributes.connected += 1
      attributes.users.push(user)
    }
  }

  const addMessage = message => {
    attributes.messeges.push(message)
  }

  const getMessages = () =>
    attributes.messeges


  const addUser = ( id, author) => {
    if( connected !== limit ) {
      attributes.users.push({ 
        id,
        author
      })
    } 
  }

  const getName = () => attributes.name



  return {
    getName,
    addUser,
    enterRoom,
    addMessage,
    getMessages,
    attributes
  }
}



module.exports = function roomsController () {
  const rooms = []


  const addRoom = ( name, limit ) => {
    const room = createRoom( name, limit )
    rooms.push( room )
  }

  const getRoom = name => rooms
    .find( room => room.getName() === name)

  const enterRoom = ( name, user ) => {
    const room = getRoom(name)
    room.enterRoom(user)
  }

  const getRooms = () => rooms.map( room => room.attributes )

  const someRoom = name => rooms
    .some( room => room.getName() === name )



  const getMessages = name => {
    const room = getRoom(name)
    return room.getMessages()
  }

  const addMessage = ( name, message ) => {
    const room = getRoom(name)
    room.addMessage(message)
  }



  const addUser = ( name_room, socket_id, author ) => {
    const room = getRoom(name_room)
    room.addUser( socket_id, author )
  }



  return {
    addRoom,
    addUser,
    addMessage,
    someRoom,
    getMessages,
    getRooms,
    enterRoom,
  }
}
