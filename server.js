
const express = require('express')
const path = require('path')
const ejs = require('ejs')
const { response } = require('express')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
})



app.use(express.static(`${__dirname}/src/public`) )
app.set( 'views', `${__dirname}/src/views` )
app.engine( 'html', ejs.renderFile )
app.set( 'view engine', 'html' )



app.get('/', ( _, response ) => {
  response.render('index.html')
})

app.get('/chat', ( _, response ) => {
  response.render('chat.html')
})

app.get('*', ( _, response ) => {
  response.render('404.html')
})



const messages = []

io.on( 'connection', socket => {

  socket.emit( 'previusMessage', messages  )

  socket.on( 'sendMessage', message => {
    messages.push(message)
    
    socket.broadcast.emit( 'receivedMessage', message )
  })

})



server.listen(3000)
