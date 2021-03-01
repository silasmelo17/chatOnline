
import { renderMessage, renderMyMessage, moveScroll, getMessage, getUser, clearInputMessage } from './render.js'

const socket = io('http://192.168.1.103:3000')
const name_room = window.location.pathname.replace('/chat/', '')



const emitConnectOrDisconnect = event =>
  socket.emit( event, {
    name_room,
    author: getUser()
  })

socket.on( 'connect', () => {
  emitConnectOrDisconnect('join room')
})

socket.on( 'disconnect', () => {
  emitConnectOrDisconnect('leave room')
})



socket.on( 'receivedMessage', message => {
  renderMessage(message)
  moveScroll()
})

socket.on( 'previusMessage', messages => {
  messages.forEach( message => {
    renderMessage(message)
  })

  moveScroll()
})



export function sendMessage () {
  const message = getMessage()
  if(message) {
    socket.emit( 'sendMessage', { name_room, message }) 
    renderMyMessage(message)
    clearInputMessage()
  }
}
