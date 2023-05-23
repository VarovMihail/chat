
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
let chatId = params.chatId
console.log(chatId)

$(function() {
  Chats()

})



function checkChatIdQueryParam() {
  if (!chatId) return
  let chatElement = $(`#${chatId}`)[0]
  console.log(chatElement)
  _makeActiveChat(chatElement)
}

function Chats() {
  $.ajax ({
    url: '/api/v1/chat/',
    type: 'GET',
    success: function (data) {
      console.log('chats success', data)
      fillOutChatList(data)
      checkChatIdQueryParam()
    }

  })
}

function fillOutChatList(data) {
  const ul = $('#chatListPagination')
  for (let chat of data.results) {
    const chatItem = chatItemHtml(chat)
    ul.append(chatItem)

  }
  $('.chat_list').click(makeActiveChat)



}

const chatItemHtml = (chat) => {
  return `   <li class="clearfix chat_list" id=${chat.id}>
      <img src="${chat.avatar}" alt="avatar">
      <div class="about">
        <div class="name">${chat.name}</div>
        <div class="status"><i class="fa fa-circle offline"></i> offline since Oct 28</div>
      </div>
    </li>`

}

function makeActiveChat() {
 _makeActiveChat(this)
}

function _makeActiveChat(ChatElement) {
   console.log('makeActiveChat', ChatElement)
  $('.active_chat').removeClass('active_chat')
  $(ChatElement).addClass('active_chat')
  const chatId = $(ChatElement).attr('id')
  fetchChatMessages(chatId)
}


function fetchChatMessages(chatId) {
  $.ajax({
    url: `/api/v1/chat/messages/${chatId}`,
    type: 'GET',
    success: function (data) {
      console.log('fetchChatMessages success', data)

      fillOutMessages(data)
    }
  })
}

function fillOutMessages(data) {

}

const rightMessage = (message) => {
  return `
  <li class="clearfix">
  <div class="message-data text-right">
    <span class="message-data-time">10:10 AM, Today</span>
    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar">
  </div>
  <div class="message other-message float-right"> Hi Aiden, how are you? How is the project coming along?</div>
</li>
  `
}

const leftMessage = (message) => {
  return `
  <li class="clearfix">
    <div class="message-data">
      <span class="message-data-time">10:12 AM, Today</span>
    </div>
    <div class="message my-message">Are we meeting today?</div>
  </li>
  `
}
