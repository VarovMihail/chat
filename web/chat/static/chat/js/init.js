console.log('init')
$(function () {
  init()
})


function init() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  $.ajax({
    url: '/api/v1/chat/init/',
    type: "POST",
    data: params,
    success: function (data) {
      console.log('success', data)
      let chatId = data.chat_id
      delete data.chat_id
      let userData = JSON.stringify(data);
      localStorage.setItem("user", userData);
      window.location.replace(`/chat/?chatId=${chatId}`)

    },
    error: function (data) {
      console.log('error', data)
    }

 })
}
