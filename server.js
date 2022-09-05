// require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const routes = require("./routes");
const PORT = 3001;
const app = express();

const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);

// Middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


// Routes
app.use(routes);


// Connect to Mongo DB 
// If deployed, use the deployed database. Otherwise use the local databasemongodb+srv://samarth39:<password>@cluster0.t2t1x.mongodb.net/?retryWrites=true&w=majority
//const MONGODB_URI = process.env.MONGODB_URI || `mongodb+srv://samarth39:<password>@cluster0.t2t1x.mongodb.net/?retryWrites=true&w=majority`;
// const MONGODB_URI = "mongodb://localhost/googlebooks";
const MONGODB_URI = "mongodb+srv://samarth39:samarth39@cluster0.t2t1x.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });


// socket
io.on('connection', socket => {
  console.log('user connected')

  // once we get the event from one of the clients, send it to the rest of the clients
  socket.on('message', (msg) => {
    io.emit('message', msg)
    console.log(`msg sent!`);
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));