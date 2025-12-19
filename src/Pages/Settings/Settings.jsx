import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { authService } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Shield, Bell, Palette, Trash2, LogOut, Save } from "lucide-react";
import toast from "react-hot-toast";
import "./settings.css";

const Settings = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');
  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [notifications, setNotifications] = useState({
    likes: true,
    comments: true,
    follows: true,
    messages: true
  });
  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showEmail: false,
    allowMessages: true
  });

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwords.new !== passwords.confirm) {
      return toast.error("New passwords don't match");
    }
    
    if (passwords.new.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    
    try {
      await authService.updatePassword({
        currentPassword: passwords.current,
        newPassword: passwords.new
      });
      toast.success("Password updated successfully");
      setPasswords({ current: '', new: '', confirm: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password");
    }
  };

  const handleLogoutAll = async () => {
    try {
      await authService.logoutAllDevices();
      logout();
      toast.success("Logged out from all devices");
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to logout from all devices");
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await authService.deleteAccount();
        logout();
        toast.success("Account deleted successfully");
        navigate('/login');
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete account");
      }
    }
  };

  const saveNotificationSettings = () => {
    toast.success("Notification settings saved");
  };

  const savePrivacySettings = () => {
    toast.success("Privacy settings saved");
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette }
  ];

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account and preferences</p>
      </div>

      <div className="settings-content">
        <div className="settings-sidebar">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`settings-tab ${activeTab === id ? 'active' : ''}`}
              onClick={() => setActiveTab(id)}
            >
              <Icon size={20} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div className="settings-main">
          {activeTab === 'account' && (
            <div className="settings-section">
              <h2>Account Settings</h2>
              
              <div className="setting-group">
                <h3>Change Password</h3>
                <form onSubmit={handlePasswordChange} className="password-form">
                  <div className="form-group">
                    <label>Current Password</label>
                    <div className="password-input">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={passwords.current}
                        onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="password-toggle"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      value={passwords.new}
                      onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                      required
                    />
                  </div>
                  
                  <button type="submit" className="save-btn">
                    <Save size={16} /> Update Password
                  </button>
                </form>
              </div>

              <div className="setting-group danger-zone">
                <h3>Danger Zone</h3>
                <div className="danger-actions">
                  <button onClick={handleLogoutAll} className="danger-btn secondary">
                    <LogOut size={16} /> Logout from all devices
                  </button>
                  <button onClick={handleDeleteAccount} className="danger-btn">
                    <Trash2 size={16} /> Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h2>Notification Preferences</h2>
              
              <div className="setting-group">
                <div className="toggle-setting">
                  <div className="toggle-info">
                    <h4>Likes</h4>
                    <p>Get notified when someone likes your posts</p>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={notifications.likes}
                      onChange={(e) => setNotifications({...notifications, likes: e.target.checked})}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                
                <div className="toggle-setting">
                  <div className="toggle-info">
                    <h4>Comments</h4>
                    <p>Get notified when someone comments on your posts</p>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={notifications.comments}
                      onChange={(e) => setNotifications({...notifications, comments: e.target.checked})}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                
                <div className="toggle-setting">
                  <div className="toggle-info">
                    <h4>New Followers</h4>
                    <p>Get notified when someone follows you</p>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={notifications.follows}
                      onChange={(e) => setNotifications({...notifications, follows: e.target.checked})}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                
                <div className="toggle-setting">
                  <div className="toggle-info">
                    <h4>Messages</h4>
                    <p>Get notified when you receive new messages</p>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={notifications.messages}
                      onChange={(e) => setNotifications({...notifications, messages: e.target.checked})}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                
                <button onClick={saveNotificationSettings} className="save-btn">
                  <Save size={16} /> Save Preferences
                </button>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="settings-section">
              <h2>Privacy & Security</h2>
              
              <div className="setting-group">
                <div className="toggle-setting">
                  <div className="toggle-info">
                    <h4>Public Profile</h4>
                    <p>Allow others to find and view your profile</p>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={privacy.profilePublic}
                      onChange={(e) => setPrivacy({...privacy, profilePublic: e.target.checked})}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                
                <div className="toggle-setting">
                  <div className="toggle-info">
                    <h4>Show Email</h4>
                    <p>Display your email address on your profile</p>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={privacy.showEmail}
                      onChange={(e) => setPrivacy({...privacy, showEmail: e.target.checked})}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                
                <div className="toggle-setting">
                  <div className="toggle-info">
                    <h4>Allow Messages</h4>
                    <p>Let others send you direct messages</p>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={privacy.allowMessages}
                      onChange={(e) => setPrivacy({...privacy, allowMessages: e.target.checked})}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                
                <button onClick={savePrivacySettings} className="save-btn">
                  <Save size={16} /> Save Settings
                </button>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="settings-section">
              <h2>Appearance</h2>
              
              <div className="setting-group">
                <div className="theme-setting">
                  <h4>Theme</h4>
                  <p>Choose your preferred theme</p>
                  <div className="theme-options">
                    <button 
                      className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                      onClick={() => theme !== 'light' && toggleTheme()}
                    >
                      <div className="theme-preview light"></div>
                      <span>Light</span>
                    </button>
                    <button 
                      className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                      onClick={() => theme !== 'dark' && toggleTheme()}
                    >
                      <div className="theme-preview dark"></div>
                      <span>Dark</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;