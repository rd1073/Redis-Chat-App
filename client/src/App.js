import React, { useState } from "react";
import socketIOClient from "socket.io-client";

const App = () => {
  const [currentChannel, setCurrentChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [channelName, setChannelName] = useState("");
  const [message, setMessage] = useState("");

  const socket = socketIOClient("http://localhost:8000");

  const joinChannel = (event) => {
    event.preventDefault();
    setCurrentChannel(channelName);
    socket.emit("subscribe", channelName);
    setMessages([`You joined ${channelName}`]);
  };

  const leaveChannel = (event) => {
    event.preventDefault();
    if (currentChannel) {
      socket.emit("unsubscribe", currentChannel);
      setMessages([...messages, `You left ${currentChannel}`]);
      setCurrentChannel(null);
    }
  };

  const sendMessage = (event) => {
    event.preventDefault();
    if (currentChannel) {
      socket.emit("send message", currentChannel, message);
      setMessage("");
    }
  };

  socket.on("new message", (data) => {
    setMessages([...messages, `${data.channel}: ${data.message}`]);
  });

  return (
    <div>
      <form onSubmit={joinChannel}>
        <input
          type="text"
          placeholder="Channel name"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
        />
        <button type="submit">Join</button>
      </form>
      <form onSubmit={leaveChannel}>
        <button type="submit">Leave</button>
      </form>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default App;