

import { sendMessage } from './socket.js'


form.addEventListener( 'submit', event => {
  event.preventDefault()
  sendMessage()
})
