
const express = require('express')



module.exports = rooms => {
  const router = express.Router()

  router.post('/chat', ( request, response ) => {
    const { name, limit } = request.body
    rooms.addRoom( name, limit )

    return response.json({
      ok: true,
      body: {name, limit}
    })
  })

  router.get( '/chats', ( _, response ) => {
    return response.json( rooms.getRooms() )
  })

  router.get('/chat/:name', (request, response) => {
    const { name } = request.params
    
    const room = rooms.someRoom(name)
    if( room )
      return response.render('chat.html')
    return response.render('404.html')
  })

  return router
}
