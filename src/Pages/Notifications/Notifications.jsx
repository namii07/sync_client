import { useState, useEffect } from "react";
import { useNotifications } from "../../context/NotificationContext";
import { notificationService } from "../../services/notificationService";
import { formatDistanceToNow } from "../../utils/formatDate";
import { Heart, MessageCircle, UserPlus, X } from "lucide-react";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import "./notifications.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const data = await notificationService.getNotifications();
        setNotifications(data.notifications || []);
      } catch (error) {
        toast.error('Failed to load notifications');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case "like": return <Heart size={16} className="text-red-500" />;
      case "comment": return <MessageCircle size={16} className="text-blue-500" />;
      case "follow": return <UserPlus size={16} className="text-green-500" />;
      default: return null;
    }
  };

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      try {
        await notificationService.markAsRead(notification._id);
        setNotifications(prev => prev.map(n => 
          n._id === notification._id ? { ...n, isRead: true } : n
        ));
      } catch (error) {
        toast.error('Failed to mark as read');
      }
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      toast.success('All notifications marked as read');
    } catch (error) {
      toast.error('Failed to mark all as read');
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      await notificationService.deleteNotification(id);
      setNotifications(prev => prev.filter(n => n._id !== id));
      toast.success('Notification deleted');
    } catch (error) {
      toast.error('Failed to delete notification');
    }
  };

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <h2>Notifications</h2>
        {notifications.some(n => !n.isRead) && (
          <button onClick={handleMarkAllAsRead} className="mark-all-read">
            Mark all as read
          </button>
        )}
      </div>

      <div className="notifications-list">
        {loading ? (
          <Loader />
        ) : notifications.length === 0 ? (
          <div className="empty-notifications">
            <p>No notifications yet</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className={`notification-card ${!notification.isRead ? 'unread' : ''}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <img src={notification.from?.avatar} alt={notification.from?.username} className="notification-avatar" />
              
              <div className="notification-content">
                <div className="notification-text">
                  {getIcon(notification.type)}
                  <span>
                    <strong>@{notification.from?.username}</strong> {notification.message}
                  </span>
                </div>
                <span className="notification-time">
                  {formatDistanceToNow(notification.createdAt)}
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteNotification(notification._id);
                }}
                className="delete-notification"
              >
                <X size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
