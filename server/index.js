const express = require('express');
const mongoose = require("mongoose");
const { User,conn}=require("./config/db")
const authRoutes=require("./routes/authRoutes");
const cors = require('cors');
const app = express();
const PORT = 5000;
const http = require('http').Server(app);



//New imports

app.use(express.json());
app.use(cors());

app.use(
    cors({
      origin: "http://localhost:3000",
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      // <-- location of the react app were connecting to
      credentials: true,
    })
  );
app.use(cors());


const socketIO = require('socket.io')(http, {
  cors: {
      origin: "http://localhost:3000"
  }
});

 

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });

  socket.on('join', data => {
    const email = data.email;
    console.log(`${email} joined!`);
    socket.name = email;
    socket.emit('join', email);
});
});


app.use("/api",  authRoutes);
  


http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


 
 