$(function(){
  $('.input-group-text').click(sendMessage);
});

const ws_scheme = window.location.protocol == "https:" ? "wss://" : "ws://";
const chatSocket = new ReconnectingWebSocket(`${ws_scheme}${window.location.host}/ws/chat/`);

chatSocket.onmessage = receiveMessage;
chatSocket.onclose = chatCloseUnexpectedly;
chatSocket.onopen = event => {}


function receiveMessage(e) {
  const data = JSON.parse(e.data);
  switch (data.type) {
    case ('new_message'):
      newMessage(data)
      break;
    case ('new_chat'):
      newChat(data.data)
      break;
    case ('video_call_received'):
      videoCallReceived(data)
      break;
  }
}

const videoCallReceived = (data) => {
  console.log('videoCall', data)
}

function chatCloseUnexpectedly(e) {
  console.error('Chat socket closed unexpectedly');
}

function sendMessage() {
  let message = $('.write_msg').val()
  let chat_id = $('.chat-history').attr('id')
  if (!messageValidation(message)) return
  let messageData = {
    'command': 'new_message',
    'chat_id': chat_id,
    'content': {
      'message': message,
    }
  }
  chatSocket.send(JSON.stringify(messageData));
  $('.write_msg').val('')
}

function messageValidation(message) {
  if (message == '') return false
  return true
}


function newChat(data){
  console.log('NEW chat', data.user)
  let chatList = $('#chatListPagination')
  let chatTemplate = chatItem(
    chatId=data.chat_id,
    userUrl='',
    avatar=data.user.avatar,
    fullName=data.user.full_name,
    created=data.created ? data.created : 'No messages',
    lastMessage=data.last_message ? data.last_message : '',
  )
  chatList.prepend(chatTemplate)
}

function newMessage(data){
  let currentUser = JSON.parse(localStorage.getItem('user'))
  let chatHistory = $('.chat-history')
  let messageHistory = $('.msg_history')
  let openedChatId = chatHistory.attr('id')
  console.log(currentUser, openedChatId)
  if (data.chat_id == openedChatId) {
    if (data.data.author.id == currentUser.id) {
     message = outgoing_message(
       message=data.data.message,
       created_at=data.data.created_at,
     )
     messageHistory.append(message)
    chatHistory.scrollTop(chatHistory.prop("scrollHeight"))
    } else {
      message = incomingMessage(
        message=data.data.message,
        avatar=data.data.author.avatar,
        created_at=data.data.created_at,
      )
     messageHistory.append(message)

    }
  } else {
    $(`#${data.chat_id}`).find('.last-message').html(`<b>${data.data.message}</b>`)
  }
}
