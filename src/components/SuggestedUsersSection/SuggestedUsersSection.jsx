import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSuggestedUsers, followUser, unfollowUser } from '../../api/users';
import Loader from '../Loader/Loader';
import { mockUsers } from '../../utils/mockData';
import toast from 'react-hot-toast';

const SuggestedUsersSection = () => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        setLoading(true);
        const data = await getSuggestedUsers();
        setSuggestedUsers(data.users || []);
      } catch (error) {
        console.error('Failed to load suggested users:', error);
        setSuggestedUsers(mockUsers);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestedUsers();
  }, []);

  const handleFollow = async (userId) => {
    try {
      const user = suggestedUsers.find(u => u._id === userId);
      if (user.isFollowing) {
        await unfollowUser(userId);
      } else {
        await followUser(userId);
      }
      
      setSuggestedUsers(prev => prev.map(u => 
        u._id === userId 
          ? { 
              ...u, 
              isFollowing: !u.isFollowing,
              followersCount: u.isFollowing ? u.followersCount - 1 : u.followersCount + 1
            }
          : u
      ));
      
      toast.success(user.isFollowing ? 'User unfollowed' : 'User followed');
    } catch (error) {
      toast.error('Failed to update follow status');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="users-section">
      <h2>Suggested for You</h2>
      <div className="users-grid">
        {suggestedUsers.map(user => (
          <div key={user._id} className="user-card">
            <Link to={`/profile/${user.username}`} className="user-info">
              <img src={user.avatar} alt={user.username} className="user-avatar" />
              <div className="user-details">
                <h3>@{user.username}</h3>
                <p>{user.bio}</p>
                <span>{user.followersCount} followers</span>
              </div>
            </Link>
            <button 
              onClick={() => handleFollow(user._id)}
              className={`follow-btn ${user.isFollowing ? 'following' : ''}`}
            >
              {user.isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedUsersSection;