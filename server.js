
const http = require('http')
const ejs = require('ejs')
const express = require('express')
const bodyParser = require('body-parser')
const socketIO = require('socket.io')

const { startSocketIO, socket_configuration } = require('./src/socket/index')
const roomsController = require('./src/socket/room')
const home = require('./src/routes/index')
const createChatRouter = require('./src/routes/chat')



const app = express()

const server = http.createServer(app)
const io = socketIO(server, socket_configuration)

const rooms = roomsController()



app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({ extended: true }) )



app.use(express.static(`${__dirname}/src/public`) )
app.set( 'views', `${__dirname}/src/views` )

app.engine( 'html', ejs.renderFile )
app.set( 'view engine', 'html' )



app.use(home)
app.use(createChatRouter(rooms))



app.get('*', ( _, response ) => {
  response.render('404.html')
})


startSocketIO(io, rooms)


server.listen(3000)
