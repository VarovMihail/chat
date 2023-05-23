$(function(){
  GetChatList();


});

let requestedNewPageChatList = false
let requestedNewPageChatMessages = false

$('#chatListPagination').scroll(function () {
  if ($(this).prop('scrollHeight') - $(this).height() <= $(this).scrollTop() && !requestedNewPageChatList) {
    let nextUrl = $(this).attr('data-href')
    if (nextUrl){
       requestedNewPageChatList = true
       GetChatList()
    }
  }
});

$('.chat-history').scroll(function () {
  if ($(this).scrollTop() <= 10 && !requestedNewPageChatMessages) {
    let nextUrl = $(this).attr('data-href')
    if (nextUrl){
       requestedNewPageChatMessages = true
       getChatMessages($(this))
    }
  }
});

function makeActiveUserChat(e) {
  let messagesBlock = $('.chat-history');
  if ($(this).attr('id') === messagesBlock.attr('id')) return
  let messageUrl = '/chat/messages/' + $(this).attr('id') + '/'
  $('.active_chat').removeClass('active_chat');
  $(this).addClass('active_chat');
  messagesBlock.attr('id', $(this).attr('id'));
  messagesBlock.attr('data-href', messageUrl);
  $('.msg_history').empty();
  requestedNewPageChatMessages = false
  getChatMessages(messagesBlock, isInitPage=true)

}

function getChatMessages(messagesBlock, isInitPage=false) {
  $.ajax({
    url: messagesBlock.attr('data-href'),
    type: "GET",
    success: function(data) {
      handlerChatMessages(data, isInitPage)
      requestedNewPageChatMessages = false;
    }
  })
}

function handlerChatMessages(data, isInitPage) {
  let messageHistory = $('.msg_history')
  let chatHistory = $('.chat-history')
  let scrollPosition = chatHistory.prop("scrollHeight")
  let userId = JSON.parse(localStorage.getItem('user')).id
  chatHistory.attr('data-href', data.next)
  let currentDay = new Date();
  for (let messageData of data.results) {
    let date = new Date(messageData.created_at);
    let message = ''
    if (messageData.author.id == userId) {
      message = outgoing_message(messageData.message, messageData.created_at, currentDay)
    } else {
      message = incomingMessage(messageData.message, messageData.author.avatar, messageData.created_at, currentDay)
    }
    messageHistory.prepend(message)
  }
  if (isInitPage) {
    chatHistory.scrollTop(chatHistory.prop("scrollHeight"))
  }
  else chatHistory.scrollTop(scrollPosition - 700)
}

function GetChatList() {
  $.ajax({
    url: $('#chatListPagination').attr('data-href'),
    type: "GET",
    success: handlerChatList
   })
}

function handlerChatList(data) {
  let chatListPaginator = $('#chatListPagination')
  chatListPaginator.attr('data-href', data.next)
  $.each(data.results, function(i){
    let contactUser = {}
    for (let j of data.results[i].user_chats) {
       if (j.data.id) contactUser=j.data
    }
    let templateString = chatItem(
      chatId=data.results[i].id,
      userUrl=contactUser.url,
      avatar=contactUser.avatar,
      fullName=contactUser.full_name,
      created=data.results[i].created,
      lastMessage=data.results[i].last_message,
    )
    chatListPaginator.append(templateString);
  })
  $('.chat_list').click(makeActiveUserChat)
  requestedNewPageChatList = false
}
