
const user = document.querySelector('input[name=user]')
const message = document.querySelector('input[name=message]')
const messages_container = document.querySelector('.messages')



const renderMessage = ({ message, author }) => {
  messages_container.innerHTML += `
    <article class='message'>
      <div>
        <img src='' />
      </div>
      <div>
        <strong>${author}</strong>
        <p>${message}</p>
      </div>
    <article/>
  `
}

const renderMyMessage = ({ message, author }) => {
  messages_container.innerHTML += `
    <article class='message my_message'>
      <div>
        <img src='' />
      </div>
      <div>
        <strong>${author}</strong>
        <p>${message}</p>
      </div>
    <article/>
  `
}



const moveScroll = () => {
  const height = messages_container.scrollHeight
  messages_container.scrollTo( 0, height )
}



const socket = io('http://192.168.1.103:3000')

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


form.addEventListener( 'submit', event => {
  event.preventDefault()
  
  if( message.value && user.value ) {
    const obj = {
      author: user.value,
      message: message.value,
    }

    socket.emit( 'sendMessage', obj) 
  
    renderMyMessage(obj)
  }

  message.value = ''
})
