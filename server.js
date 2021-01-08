const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

var botName = "🤖 Secure Chat Bot";
var bot2Name = "🤖 User Bot";

// Run when client connects
io.on("connection", socket => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    setTimeout(() => {
      socket.emit(
        "message",
        formatMessage(botName, "Welcome to Secure Chat Rooms!")
      );
    }, 1);
    setTimeout(() => {
      socket.emit(
        "message",
        formatMessage(
          botName,
          "Please be aware that you cannot view previous messages when you join or reload for security reasons (and because of the fact that I don't have a server) so please decide a time you want to meet and arrive a little before the time."
        )
      );
    }, 2000);
    setTimeout(() => {
      socket.emit(
        "message",
        formatMessage(
          botName,
          "In most cases, please use your real name."
        )
      );
    }, 2999);
    setTimeout(() => {
      socket.emit(
        "message",
        formatMessage(
          botName,
          "New Feature! 1/7/2020: You can now delete messages." 
        )
      );
    }, 4598);
    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(bot2Name, `${user.username} has joined the chat!`)
      );

    // Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // Listen for chatMessage
  socket.on("chatMessage", msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(bot2Name, `${user.username} has left the chat!`)
      );

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
