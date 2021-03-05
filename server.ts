
import * as http from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';

const SocketIO = require('socket.io')
const ejs = require('ejs')

import { startSocketIO, socket_configuration } from './src/socket/index';
import roomsController from './src/socket/roomController';
import routerHome from './src/routes/index';
import createChatRouter from './src/routes/chat';



const app = express()

const server = http.createServer(app)
const io = SocketIO(server, socket_configuration)

const rooms = roomsController()



app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({ extended: true }) )



app.use(express.static(`${__dirname}/src/public`) )
app.set( 'views', `${__dirname}/src/views` )

app.engine( 'html', ejs.renderFile )
app.set( 'view engine', 'html' )



app.use(routerHome)
app.use(createChatRouter(rooms))



app.get('*', async function (req, res) {
  return res.render('404.html')
})


startSocketIO(io, rooms)



const port = 3000
server.listen(port)
