

function startSocketIO( io, rooms ) {



  io.on( 'connection', socket => {

    socket.on( 'join room', ({ name_room, author }) => {
      socket.join(name_room)
      
      rooms.enterRoom(name_room, {
        author,
        id: socket.id
      })
      
      const messages = rooms.getMessages(name_room)
      socket.emit( 'previusMessage', messages  )
    })

    socket.on('leave room', ({ name_room, author }) => {
      socket.leave(name_room)
      rooms.leaveRoom( name_room, {
        author,
        id: socket.id
      })
    })


    socket.on( 'sendMessage', data => {
      const { name_room, message } = data

      rooms.addMessage( name_room, message)
      socket
        .to(name_room)
        .emit( 'receivedMessage', message )
    })
    
  })

}



const socket_configuration = {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
}

module.exports = {
  startSocketIO,
  socket_configuration
}
