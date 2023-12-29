//Importing the dependencies
const express = require("express");
const app = express();
const server = require("http").Server(app);
// So that it can be accessed from any origin
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const redis = require("redis");

const main = async () => {
  // Creating a redis client
  const redisClientPub = redis.createClient();
  await redisClientPub.connect();

  // creating a redis subscriber
  const redisClientSub = redisClientPub.duplicate();
  await redisClientSub.connect();

  app.get("/", (req, res) => {
    res.send("success");
  });

  // Creating a websocket connection.
  io.on("connection", (socket) => {
    socket.on("subscribe", async (channel) => {
      await redisClientSub.subscribe(channel, (message) => {
        io.emit("new message", { channel: channel, message: message });
      });
    });

    socket.on("unsubscribe", async (channel) => {
      await redisClientSub.unsubscribe(channel);
    });

    socket.on("send message", async (channel, message) => {
      await redisClientPub.publish(channel, message);
    });
  });

  server.listen(8000, () => {
    console.log("Server is running");
  });
};

main();