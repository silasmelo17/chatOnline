
const user = document.querySelector('input[name=user]')
const message = document.querySelector('input[name=message]')
const messages_container = document.querySelector('.messages')



export const renderMessage = ({ message, author }) => {
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

export const renderMyMessage = ({ message, author }) => {
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



export const moveScroll = () => {
  const height = messages_container.scrollHeight
  messages_container.scrollTo( 0, height )
}

export function getMessage() {
  if( message.value && user.value )
    return {
      author: user.value,
      message: message.value,
    }
  return false
}

export function clearInputMessage () {
  message.value = ""
}

export function getUser() {
  return user.value
}
