import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { notificationService } from "../../services/notificationService";
import { authService } from "../../services/authService";
import { Bell, Search, Home, User, Settings, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import "./navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const data = await notificationService.getUnreadCount();
        setUnreadCount(data.count || 0);
      } catch (error) {
        console.error('Failed to fetch unread count:', error);
      }
    };

    if (user) {
      fetchUnreadCount();
      // Set up polling for real-time updates
      const interval = setInterval(fetchUnreadCount, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await authService.logout();
      logout();
      navigate("/login");
      toast.success('Logged out successfully');
    } catch (error) {
      // Still logout locally even if API call fails
      logout();
      navigate("/login");
    }
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-logo">
          SYNC
        </Link>
        
        <div className="navbar-search">
          <Search size={20} />
          <input type="text" placeholder="Search users..." />
        </div>

        <div className="navbar-actions">
          <Link to="/" className="nav-icon">
            <Home size={24} />
          </Link>
          
          <Link to="/notifications" className="nav-icon notification-icon">
            <Bell size={24} />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </Link>
          
          <Link to="/profile" className="nav-icon">
            <User size={24} />
          </Link>
          
          <Link to="/settings" className="nav-icon">
            <Settings size={24} />
          </Link>
          
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          
          <button onClick={handleLogout} className="nav-icon logout-btn">
            <LogOut size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
