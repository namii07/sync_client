import { useState, useEffect } from "react";
import { Users, FileText, AlertTriangle, TrendingUp, Eye, Trash2, CheckCircle, XCircle } from "lucide-react";
import { adminService } from "../../services/adminService";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import "./admin.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  
  const [reports, setReports] = useState([]);
  
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        const [statsData, reportsData, usersData] = await Promise.all([
          adminService.getStats(),
          adminService.getReports(),
          adminService.getUsers()
        ]);
        
        setStats(statsData);
        setReports(reportsData.reports || []);
        setUsers(usersData.users || []);
      } catch (error) {
        toast.error('Failed to load admin data');
        console.error('Admin data fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleReportAction = async (reportId, action) => {
    try {
      await adminService.handleReport(reportId, action);
      setReports(prev => prev.map(report => 
        report._id === reportId 
          ? { ...report, status: action }
          : report
      ));
      
      toast.success(`Report ${action === 'approved' ? 'approved' : 'dismissed'}`);
    } catch (error) {
      toast.error('Failed to update report');
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await adminService.deletePost(postId);
        toast.success('Post deleted successfully');
        setReports(prev => prev.filter(report => report.post?._id !== postId));
      } catch (error) {
        toast.error('Failed to delete post');
      }
    }
  };

  const handleUserAction = async (userId, action) => {
    try {
      await adminService.updateUserStatus(userId, action);
      setUsers(prev => prev.map(user => 
        user._id === userId 
          ? { ...user, status: action }
          : user
      ));
      
      toast.success(`User ${action}d successfully`);
    } catch (error) {
      toast.error('Failed to update user status');
    }
  };

  const getReportTypeIcon = (type) => {
    switch (type) {
      case 'inappropriate_content': return <FileText size={16} />;
      case 'harassment': return <AlertTriangle size={16} />;
      default: return <AlertTriangle size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f39c12';
      case 'approved': return '#27ae60';
      case 'dismissed': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage users, posts, and reports</p>
      </div>

      <div className="admin-tabs">
        <button 
          className={`admin-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <TrendingUp size={20} /> Overview
        </button>
        <button 
          className={`admin-tab ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          <AlertTriangle size={20} /> Reports ({reports.filter(r => r.status === 'pending').length})
        </button>
        <button 
          className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <Users size={20} /> Users
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon users">
                  <Users size={24} />
                </div>
                <div className="stat-info">
                  <h3>{stats.totalUsers.toLocaleString()}</h3>
                  <p>Total Users</p>
                  <span className="stat-change positive">+{stats.newUsersToday} today</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon posts">
                  <FileText size={24} />
                </div>
                <div className="stat-info">
                  <h3>{stats.totalPosts.toLocaleString()}</h3>
                  <p>Total Posts</p>
                  <span className="stat-change positive">+{stats.postsToday} today</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon active">
                  <Eye size={24} />
                </div>
                <div className="stat-info">
                  <h3>{stats.activeUsers.toLocaleString()}</h3>
                  <p>Active Users</p>
                  <span className="stat-change positive">72% of total</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon reports">
                  <AlertTriangle size={24} />
                </div>
                <div className="stat-info">
                  <h3>{stats.reports}</h3>
                  <p>Pending Reports</p>
                  <span className="stat-change neutral">Needs attention</span>
                </div>
              </div>
            </div>
            
            <div className="recent-activity">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon">
                    <Users size={16} />
                  </div>
                  <div className="activity-content">
                    <p><strong>45 new users</strong> joined today</p>
                    <span>2 hours ago</span>
                  </div>
                </div>
                
                <div className="activity-item">
                  <div className="activity-icon">
                    <AlertTriangle size={16} />
                  </div>
                  <div className="activity-content">
                    <p><strong>New report</strong> submitted for review</p>
                    <span>4 hours ago</span>
                  </div>
                </div>
                
                <div className="activity-item">
                  <div className="activity-icon">
                    <FileText size={16} />
                  </div>
                  <div className="activity-content">
                    <p><strong>123 new posts</strong> created today</p>
                    <span>6 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="reports-section">
            <h2>Content Reports</h2>
            
            <div className="reports-list">
              {reports.map(report => (
                <div key={report.id} className="report-card">
                  <div className="report-header">
                    <div className="report-type">
                      {getReportTypeIcon(report.type)}
                      <span>{report.type.replace('_', ' ')}</span>
                    </div>
                    <div 
                      className="report-status"
                      style={{ color: getStatusColor(report.status) }}
                    >
                      {report.status}
                    </div>
                  </div>
                  
                  <div className="report-content">
                    <p><strong>Reason:</strong> {report.reason}</p>
                    <p><strong>Reported by:</strong> @{report.reportedBy}</p>
                    <p><strong>Post content:</strong> {report.postContent}</p>
                    <p><strong>Time:</strong> {report.timestamp.toLocaleString()}</p>
                  </div>
                  
                  {report.status === 'pending' && (
                    <div className="report-actions">
                      <button 
                        onClick={() => handleReportAction(report.id, 'approved')}
                        className="action-btn approve"
                      >
                        <CheckCircle size={16} /> Approve
                      </button>
                      <button 
                        onClick={() => handleReportAction(report.id, 'dismissed')}
                        className="action-btn dismiss"
                      >
                        <XCircle size={16} /> Dismiss
                      </button>
                      <button 
                        onClick={() => handleDeletePost(report.postId)}
                        className="action-btn delete"
                      >
                        <Trash2 size={16} /> Delete Post
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-section">
            <h2>User Management</h2>
            
            <div className="users-table">
              <div className="table-header">
                <div>Username</div>
                <div>Email</div>
                <div>Join Date</div>
                <div>Posts</div>
                <div>Followers</div>
                <div>Status</div>
                <div>Actions</div>
              </div>
              
              {users.map(user => (
                <div key={user.id} className="table-row">
                  <div>@{user.username}</div>
                  <div>{user.email}</div>
                  <div>{new Date(user.joinDate).toLocaleDateString()}</div>
                  <div>{user.posts}</div>
                  <div>{user.followers}</div>
                  <div>
                    <span className={`status-badge ${user.status}`}>
                      {user.status}
                    </span>
                  </div>
                  <div className="user-actions">
                    {user.status === 'active' ? (
                      <button 
                        onClick={() => handleUserAction(user.id, 'suspend')}
                        className="action-btn suspend"
                      >
                        Suspend
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleUserAction(user.id, 'active')}
                        className="action-btn activate"
                      >
                        Activate
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;