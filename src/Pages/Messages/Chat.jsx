import { useState, useEffect, useRef } from "react";
import { Send, Search, MoreVertical, Phone, Video, Smile } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { messageService } from "../../services/messageService";
import { formatDistanceToNow } from "../../utils/formatDate";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import "./chat.css";

const Chat = () => {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);

  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const data = await messageService.getConversations();
        setConversations(data.conversations || []);
      } catch (error) {
        toast.error('Failed to load conversations');
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChat) return;
      
      try {
        setMessagesLoading(true);
        const data = await messageService.getMessages(selectedChat._id);
        setMessages(data.messages || []);
      } catch (error) {
        toast.error('Failed to load messages');
      } finally {
        setMessagesLoading(false);
      }
    };

    fetchMessages();
  }, [selectedChat]);

  const filteredConversations = conversations.filter(conv =>
    conv.otherUser?.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedChat) return;

    try {
      const newMessage = await messageService.sendMessage(selectedChat.otherUser._id, {
        content: message.trim()
      });

      setMessages(prev => [...prev, newMessage]);
      
      setConversations(prev => prev.map(conv => 
        conv._id === selectedChat._id 
          ? {
              ...conv,
              lastMessage: newMessage,
              updatedAt: new Date()
            }
          : conv
      ));

      setMessage('');
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const markAsRead = async (chatId) => {
    try {
      await messageService.markAsRead(chatId);
      setConversations(prev => prev.map(conv =>
        conv._id === chatId ? { ...conv, unreadCount: 0 } : conv
      ));
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  useEffect(() => {
    if (selectedChat) {
      markAsRead(selectedChat._id);
    }
  }, [selectedChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedChat]);

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="conversations-list">
          {loading ? (
            <Loader />
          ) : (
            filteredConversations.map(conversation => (
              <div
                key={conversation._id}
                className={`conversation-item ${selectedChat?._id === conversation._id ? 'active' : ''}`}
                onClick={() => setSelectedChat(conversation)}
              >
                <div className="conversation-avatar">
                  <img src={conversation.otherUser?.avatar} alt={conversation.otherUser?.username} />
                </div>
                
                <div className="conversation-info">
                  <div className="conversation-header">
                    <h4>@{conversation.otherUser?.username}</h4>
                    <span className="timestamp">
                      {formatDistanceToNow(conversation.lastMessage?.createdAt)}
                    </span>
                  </div>
                  <p className="last-message">
                    {conversation.lastMessage?.sender === user._id && 'You: '}
                    {conversation.lastMessage?.content}
                  </p>
                </div>
                
                {conversation.unreadCount > 0 && (
                  <div className="unread-badge">{conversation.unreadCount}</div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="chat-main">
        {selectedChat ? (
          <>
            <div className="chat-header">
              <div className="chat-user-info">
                <img src={selectedChat.otherUser?.avatar} alt={selectedChat.otherUser?.username} />
                <div>
                  <h3>@{selectedChat.otherUser?.username}</h3>
                  <span className="status offline">Offline</span>
                </div>
              </div>
              
              <div className="chat-actions">
                <button className="action-btn">
                  <Phone size={20} />
                </button>
                <button className="action-btn">
                  <Video size={20} />
                </button>
                <button className="action-btn">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            <div className="messages-container">
              {messagesLoading ? (
                <Loader />
              ) : (
                messages.map(msg => (
                  <div
                    key={msg._id}
                    className={`message ${msg.sender === user._id ? 'sent' : 'received'}`}
                  >
                    {msg.sender !== user._id && (
                      <img src={selectedChat.otherUser?.avatar} alt={selectedChat.otherUser?.username} className="message-avatar" />
                    )}
                    <div className="message-content">
                      <div className="message-bubble">
                        <p>{msg.content}</p>
                      </div>
                      <span className="message-time">
                        {formatDistanceToNow(msg.createdAt)}
                      </span>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
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
                <button type="button" className="emoji-btn">
                  <Smile size={20} />
                </button>
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