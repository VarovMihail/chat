$(function(){
  initChat();
});

function initChat() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  $.ajax({
    url: '/init/',
    type: "POST",
    data: params,
    success: function (data) {
      console.log('success', data)
      let userData = JSON.stringify(data);
      localStorage.setItem("user", userData);
      window.location.replace('/')
    },
    error: function (data) {
      console.log('error', data)
    }
 })
}
