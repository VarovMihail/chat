const chatItem = (chatId, userUrl, avatar, fullName, created, lastMessage) => {
  let templateString = `
    <li class="clearfix chat_list" id=${chatId}>
      <img src="${avatar}" alt="avatar">
      <div class="about">
        <div class="name">${fullName}</div>
        <div class="status"><i class="fa fa-circle offline"></i> offline since Oct 28</div>
      </div>
    </li>
  `
  return templateString
}

const outgoing_message = (message, created_at, currentDay) => {
  currentDay = currentDay ? currentDay : new Date();
  let templateString = `
    <li class="clearfix">
      <div class="message-data">
        <span class="message-data-time">${formattedDateTime(created_at, currentDay)}</span>
      </div>
      <div class="message my-message">${message}</div>
    </li>
  `

  return templateString
}

const incomingMessage = (message, avatar, created_at, currentDay) => {
  currentDay = currentDay ? currentDay : new Date();
  let templateString = `
    <li class="clearfix">
      <div class="message-data text-right">
        <span class="message-data-time">${formattedDateTime(created_at, currentDay)}</span>
        <img src="${avatar}" alt="avatar">
      </div>
      <div class="message other-message float-right">${message}</div>
    </li>
  `
  return templateString
}

const formattedDateTime = (dateTime, currentDay) => {
  let date = new Date(dateTime)
  let millisecondsInDay = 86400000
  let hours = date.getHours()
  if (hours < 12) a_p = "AM"
  else a_p = "PM"
  if (hours == 0) hours = 12
  if (hours > 12) hours = hours - 12
  let minutes = date.getMinutes();
  let delta = currentDay - date
  let day = `${date.getDate()} ${getStrMonth(date.getMonth())}`
  minutes = minutes + "";

  if (minutes.length == 1) minutes = "0" + minutes

  if (delta < millisecondsInDay)  day = 'Today'
  else if (delta < 2 * millisecondsInDay ) day = 'Yesterday'
  return `${hours + ":" + minutes + " " + a_p},    ${day}`
}


const getStrMonth = (monthNumber) => {
  switch (monthNumber) {
    case 0: return 'Jan'
    case 1: return 'Feb'
    case 2: return 'Mar'
    case 3: return 'Apr'
    case 4: return 'May'
    case 5: return 'Jun'
    case 6: return 'Jul'
    case 7: return 'Aug'
    case 8: return 'Sep'
    case 9: return 'Oct'
    case 10: return 'Nov'
    case 11: return 'Dec'
  }
}
