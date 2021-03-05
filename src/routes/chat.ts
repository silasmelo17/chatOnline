
import * as express from 'express'
import { RoomController } from '../socket/@types'



export default (rooms: RoomController) => {
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
    if( room ) {
      const allowed = rooms.allowedConnection(name)
      console.log(allowed);
      if(allowed)
        return response.render('chat.html')
      else
        return response.render('limit.html')
    }
    return response.render('404.html')
  })

  return router
}
