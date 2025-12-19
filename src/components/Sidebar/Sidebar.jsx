import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Home, Search, Bell, Mail, User, Settings, TrendingUp, Users } from "lucide-react";
import "./sidebar.css";

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Explore", path: "/explore" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: Mail, label: "Messages", path: "/messages" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const trendingTopics = [
    "#ReactJS", "#WebDev", "#JavaScript", "#CSS", "#Frontend"
  ];

  const suggestedUsers = [
    { username: "alice", avatar: "https://i.pinimg.com/736x/b3/35/ec/b335ecd186e7a7e8913c41418ce9c9c0.jpg" },
    { username: "john", avatar: "https://i.pinimg.com/736x/78/49/25/784925b2707ac85810965a0fcb0da88a.jpg" },
  ];

  if (!user) return null;

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {menuItems.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className={`sidebar-item ${location.pathname === path ? 'active' : ''}`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-section">
        <h3><TrendingUp size={16} /> Trending</h3>
        <div className="trending-list">
          {trendingTopics.map(topic => (
            <div key={topic} className="trending-item">{topic}</div>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <h3><Users size={16} /> Suggested</h3>
        <div className="suggested-users">
          {suggestedUsers.map(user => (
            <div key={user.username} className="suggested-user">
              <img src={user.avatar} alt={user.username} />
              <span>@{user.username}</span>
              <button>Follow</button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
