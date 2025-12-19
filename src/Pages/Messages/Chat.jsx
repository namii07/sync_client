import { useState } from 'react';
import { Send, Search } from 'lucide-react';
import './chat.css';

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');

  const conversations = [
    {
      id: 1,
      user: { name: 'Alice', avatar: 'https://i.pinimg.com/736x/b3/35/ec/b335ecd186e7a7e8913c41418ce9c9c0.jpg' },
      lastMessage: 'Hey! How are you?',
      time: '2m ago',
      unread: 2
    },
    {
      id: 2,
      user: { name: 'John', avatar: 'https://i.pinimg.com/736x/78/49/25/784925b2707ac85810965a0fcb0da88a.jpg' },
      lastMessage: 'Thanks for the help!',
      time: '1h ago',
      unread: 0
    },
    {
      id: 3,
      user: { name: 'Sarah', avatar: 'https://i.pinimg.com/736x/51/da/e4/51dae45486f8cdf2a37067a5439bdc7f.jpg' },
      lastMessage: 'See you tomorrow',
      time: '3h ago',
      unread: 1
    }
  ];

  const messages = selectedChat ? [
    { id: 1, text: 'Hey! How are you?', sender: 'other', time: '2:30 PM' },
    { id: 2, text: 'I\'m good, thanks! How about you?', sender: 'me', time: '2:32 PM' },
    { id: 3, text: 'Doing great! Working on some new projects', sender: 'other', time: '2:35 PM' }
  ] : [];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add message logic here
    setMessage('');
  };

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <div className="chat-header">
          <h2>Messages</h2>
        </div>
        
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="search-input"
          />
        </div>

        <div className="conversations-list">
          {conversations.map(conversation => (
            <div
              key={conversation.id}
              className={`conversation-item ${selectedChat?.id === conversation.id ? 'active' : ''}`}
              onClick={() => setSelectedChat(conversation)}
            >
              <div className="conversation-avatar">
                <img src={conversation.user.avatar} alt={conversation.user.name} />
              </div>
              
              <div className="conversation-info">
                <div className="conversation-header">
                  <h4>{conversation.user.name}</h4>
                  <span className="timestamp">{conversation.time}</span>
                </div>
                <p className="last-message">{conversation.lastMessage}</p>
              </div>
              
              {conversation.unread > 0 && (
                <div className="unread-badge">{conversation.unread}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="chat-main">
        {selectedChat ? (
          <>
            <div className="chat-header">
              <div className="chat-user-info">
                <img src={selectedChat.user.avatar} alt={selectedChat.user.name} />
                <div>
                  <h3>{selectedChat.user.name}</h3>
                  <span className="status online">Online</span>
                </div>
              </div>
            </div>

            <div className="messages-container">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`message ${msg.sender === 'me' ? 'sent' : 'received'}`}
                >
                  <div className="message-content">
                    <div className="message-bubble">
                      <p>{msg.text}</p>
                    </div>
                    <span className="message-time">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="message-input-container">
              <div className="message-input-wrapper">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="message-input"
                />
              </div>
              <button type="submit" className="send-btn" disabled={!message.trim()}>
                <Send size={20} />
              </button>
            </form>
          </>
        ) : (
          <div className="no-chat-selected">
            <div className="no-chat-content">
              <h3>Select a conversation</h3>
              <p>Choose a conversation from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;