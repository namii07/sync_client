import { useState, useEffect } from 'react';
import { getNotifications, markNotificationAsRead, clearAllNotifications } from '../../api/notifications';
import { Bell, Trash2 } from 'lucide-react';
import './notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const data = await getNotifications();
        setNotifications(data.notifications || []);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId);
      setNotifications(prev => 
        prev.map(notif => 
          notif._id === notificationId ? { ...notif, isRead: true } : notif
        )
      );
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleClearAll = async () => {
    if (window.confirm('Clear all notifications?')) {
      try {
        await clearAllNotifications();
        setNotifications([]);
      } catch (error) {
        console.error('Failed to clear notifications:', error);
      }
    }
  };

  if (loading) return <div>Loading notifications...</div>;

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <h1><Bell size={24} /> Notifications</h1>
        {notifications.length > 0 && (
          <button onClick={handleClearAll} className="clear-all-btn">
            <Trash2 size={16} /> Clear All
          </button>
        )}
      </div>

      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div className="no-notifications">
            <p>No notifications yet</p>
          </div>
        ) : (
          notifications.map(notification => (
            <div 
              key={notification._id} 
              className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}
              onClick={() => !notification.isRead && handleMarkAsRead(notification._id)}
            >
              <img src={notification.from?.avatar} alt={notification.from?.username} />
              <div className="notification-content">
                <p>{notification.message}</p>
                <span className="notification-time">
                  {new Date(notification.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;