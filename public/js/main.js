const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

const socket = io();

// Join chatroom
socket.emit("joinRoom", { username, room });

// Get room and users
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message from server
socket.on("message", message => {
  console.log(message);
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener("submit", e => {
  e.preventDefault();

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  function convertToLowerCase(str) {
    let result = "";

    for (var i = 0; i < str.length; i++) {
      var code = str.charCodeAt(i);
      if (code > 64 && code < 91) {
        result += String.fromCharCode(code + 32);
      } else {
        result += str.charAt(i);
      }
    }
    return result;
  }

  // Get message text
  let msgValue = e.target.elements.msg.value;
  let msg1 = msgValue.replace(/crap/gi, "[REDACTED]");
  let msg2 = msg1.replace(/shit/gi, "[REDACTED]");
  let msg3 = msg2.replace(/bitch/gi, "[REDACTED]");
  let msg4 = msg3.replace(/fuck/gi, "[REDACTED]");
  let msg5 = msg4.replace("assi", "asi334");
  let msg6 = msg5.replace(/ass/gi, "[REDACTED]");
  let msg7 = msg6.replace("asi334", "assi");
  let msg8 = msg7.replace(/damn/gi, "[REDACTED]");
  // let msg9 = capitalizeFirstLetter(msg6);
  let msg = msg8;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // Emit message to server
  socket.emit("chatMessage", msg);

  // Clear input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
  var today = new Date();
  var h = today.getHours();
  var min = today.getMinutes();
  if (min == "1") {
    var m = "0" + min;
  } else if (min == "2") {
    var m = "0" + min;
  } else if (min == "3") {
    var m = "0" + min;
  } else if (min == "4") {
    var m = "0" + min;
  } else if (min == "5") {
    var m = "0" + min;
  } else if (min == "6") {
    var m = "0" + min;
  } else if (min == "7") {
    var m = "0" + min;
  } else if (min == "8") {
    var m = "0" + min;
  } else if (min == "9") {
    var m = "0" + min;
  } else {
    var m = min;
  }
  var sec = today.getSeconds();
  if (sec == "1") {
    var s = "0" + sec;
  } else if (sec == "2") {
    var s = "0" + sec;
  } else if (sec == "3") {
    var s = "0" + sec;
  } else if (sec == "4") {
    var s = "0" + sec;
  } else if (sec == "5") {
    var s = "0" + sec;
  } else if (sec == "6") {
    var s = "0" + sec;
  } else if (sec == "7") {
    var s = "0" + sec;
  } else if (sec == "8") {
    var s = "0" + sec;
  } else if (sec == "9") {
    var s = "0" + sec;
  } else {
    var s = sec;
  }
  const div = document.createElement("div");
  div.classList.add("message");
  const p = document.createElement("p");
  p.classList.add("meta");
  p.innerText = message.username;
  const btn = document.createElement("button");
  btn.classList.add("closeBtn");
  // btn.add("alert('e')");
  btn.innerText = "✖";
  div.appendChild(btn);
  // ' ' + Intl.DateTimeFormat().resolvedOptions().timeZone +
  p.innerHTML += '<span class="time"> ' + h + ":" + m + ":" + s + "</span>";
  div.appendChild(p);
  const para = document.createElement("p");
  para.classList.add("text");
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector(".chat-messages").appendChild(div);
  var whole = document.querySelector(".chat-messages").innerHTML;
  var none = "'none'";
  var replace = whole.replaceAll(
    'class="closeBtn"',
    'class="closeBtn" onclick="this.parentElement.style.display=' + none + ';"'
  );
  document.querySelector(".chat-messages").innerHTML = replace;
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = "";
  users.forEach(user => {
    const li = document.createElement("li");
    li.innerText = user.username;
    userList.appendChild(li);
  });
}
if (location.protocol !== "https:") {
  location.replace(
    `https:${location.href.substring(location.protocol.length)}`
  );
}
var savedUsername = document.getElementByID("username").value;
var savedRoomID = document.getElementByID("room").value;
localStorage.setItem("username", savedUsername);
localStorage.setItem("room", savedRoomID);
