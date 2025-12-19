import { useState } from "react";
import "./chat.css";

const Chat = () => {
  const [message, setMessage] = useState("");

  const messages = [
    { id: 1, text: "Hey!", sender: "me" },
    { id: 2, text: "Hi 💜", sender: "other" },
    { id: 3, text: "SYNC looks amazing!", sender: "other" },
  ];

  return (
    <div className="chat-container">
      <div className="chat-header">
        <img
          src="https://i.pinimg.com/736x/b3/35/ec/b335ecd186e7a7e8913c41418ce9c9c0.jpg"
          alt=""
        />
        <div>
          <h4>@alice</h4>
          <span className="online">● Online</span>
        </div>
      </div>

      <div className="chat-body">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`bubble ${msg.sender === "me" ? "me" : "other"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          placeholder="Type a message…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>Send</button>
      </div>
    </div>
  );
};

export default Chat;
