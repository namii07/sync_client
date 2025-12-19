import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getUserProfile, followUser, unfollowUser } from "../../api/users";
import { getUserPosts } from "../../api/posts";
import { Calendar, MapPin, Link as LinkIcon, Edit3, UserPlus, UserMinus } from "lucide-react";
import PostCard from "../../components/PostCard/PostCard";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import "./profile.css";

const Profile = () => {
  const { username } = useParams();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');
  const [isFollowing, setIsFollowing] = useState(false);

  const isOwnProfile = !username || username === currentUser?.username;
  const profileUser = isOwnProfile ? currentUser : user;

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      
      try {
        let profileData;
        
        if (isOwnProfile) {
          profileData = currentUser;
        } else {
          const response = await getUserProfile(username);
          profileData = response.user;
          setUser(profileData);
          setIsFollowing(response.isFollowing);
        }
        
        // Fetch user posts
        if (profileData?._id) {
          const postsResponse = await getUserPosts(profileData._id);
          setPosts(postsResponse.posts || []);
        }
        
      } catch (error) {
        toast.error("Failed to load profile");
        console.error('Profile fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser || username) {
      fetchProfile();
    }
  }, [username, isOwnProfile, currentUser]);

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(user._id);
        setIsFollowing(false);
        setUser(prev => ({ ...prev, followersCount: prev.followersCount - 1 }));
        toast.success('Unfollowed');
      } else {
        await followUser(user._id);
        setIsFollowing(true);
        setUser(prev => ({ ...prev, followersCount: prev.followersCount + 1 }));
        toast.success('Following');
      }
    } catch (error) {
      toast.error('Failed to update follow status');
    }
  };

  if (loading) return <Loader />;
  if (!profileUser) return <div>User not found</div>;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-cover">
          <div className="cover-image"></div>
        </div>
        
        <div className="profile-info">
          <div className="profile-avatar-container">
            <img src={profileUser.avatar} alt={profileUser.username} className="profile-avatar" />
          </div>
          
          <div className="profile-details">
            <div className="profile-name-section">
              <h1>@{profileUser.username}</h1>
              {isOwnProfile ? (
                <Link to="/profile/edit" className="edit-profile-btn">
                  <Edit3 size={16} /> Edit Profile
                </Link>
              ) : (
                <button 
                  onClick={handleFollow}
                  className={`follow-btn ${isFollowing ? 'following' : ''}`}
                >
                  {isFollowing ? (
                    <><UserMinus size={16} /> Unfollow</>
                  ) : (
                    <><UserPlus size={16} /> Follow</>
                  )}
                </button>
              )}
            </div>
            
            <p className="profile-bio">{profileUser.bio}</p>
            
            <div className="profile-meta">
              {profileUser.location && (
                <span className="meta-item">
                  <MapPin size={16} /> {profileUser.location}
                </span>
              )}
              {profileUser.website && (
                <a href={profileUser.website} className="meta-item link">
                  <LinkIcon size={16} /> {profileUser.website}
                </a>
              )}
              {profileUser.joinDate && (
                <span className="meta-item">
                  <Calendar size={16} /> Joined {new Date(profileUser.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
              )}
            </div>
            
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-number">{posts.length}</span>
                <span className="stat-label">Posts</span>
              </div>
              <div className="stat">
                <span className="stat-number">{profileUser.followers}</span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="stat">
                <span className="stat-number">{profileUser.following}</span>
                <span className="stat-label">Following</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="profile-tabs">
        <button 
          className={`tab ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          Posts
        </button>
        <button 
          className={`tab ${activeTab === 'media' ? 'active' : ''}`}
          onClick={() => setActiveTab('media')}
        >
          Media
        </button>
        <button 
          className={`tab ${activeTab === 'likes' ? 'active' : ''}`}
          onClick={() => setActiveTab('likes')}
        >
          Likes
        </button>
      </div>
      
      <div className="profile-content">
        {activeTab === 'posts' && (
          <div className="posts-grid">
            {posts.length === 0 ? (
              <div className="empty-state">
                <p>No posts yet</p>
              </div>
            ) : (
              posts.map(post => (
                <PostCard 
                  key={post._id} 
                  post={post} 
                  currentUser={currentUser}
                />
              ))
            )}
          </div>
        )}
        
        {activeTab === 'media' && (
          <div className="media-grid">
            {posts.filter(p => p.image).map(post => (
              <div key={post._id} className="media-item">
                <img src={post.image} alt="Media" />
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'likes' && (
          <div className="empty-state">
            <p>Liked posts will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
