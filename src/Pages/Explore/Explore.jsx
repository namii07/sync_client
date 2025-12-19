import { useState, useEffect } from "react";
import { Search, TrendingUp, Users, Hash, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { userService } from "../../services/userService";
import TrendingSection from "../../components/TrendingSection/TrendingSection";
import SuggestedUsersSection from "../../components/SuggestedUsersSection/SuggestedUsersSection";
import toast from "react-hot-toast";
import "./explore.css";

const Explore = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const trendingTopics = [
    { tag: '#ReactJS', posts: 1234, growth: '+12%' },
    { tag: '#WebDev', posts: 987, growth: '+8%' },
    { tag: '#JavaScript', posts: 2156, growth: '+15%' },
    { tag: '#CSS', posts: 654, growth: '+5%' },
    { tag: '#Frontend', posts: 432, growth: '+18%' },
    { tag: '#Backend', posts: 321, growth: '+7%' }
  ];

  const suggestedUsers = [
    {
      id: 1,
      username: 'alice',
      avatar: 'https://i.pinimg.com/736x/b3/35/ec/b335ecd186e7a7e8913c41418ce9c9c0.jpg',
      bio: 'Frontend Developer | React Enthusiast',
      followers: 1234,
      isFollowing: false
    },
    {
      id: 2,
      username: 'john',
      avatar: 'https://i.pinimg.com/736x/78/49/25/784925b2707ac85810965a0fcb0da88a.jpg',
      bio: 'Full Stack Developer | Open Source Contributor',
      followers: 987,
      isFollowing: false
    },
    {
      id: 3,
      username: 'sarah',
      avatar: 'https://i.pinimg.com/736x/51/da/e4/51dae45486f8cdf2a37067a5439bdc7f.jpg',
      bio: 'UI/UX Designer | Creative Thinker',
      followers: 756,
      isFollowing: true
    }
  ];

  const trendingPosts = [
    {
      id: 1,
      text: 'Just launched my new React project! 🚀 #ReactJS #WebDev',
      image: 'https://i.pinimg.com/736x/ea/e2/91/eae29154a567b88bb9b830f58a868e75.jpg',
      likes: 156,
      liked: false,
      saved: false,
      author: {
        username: 'alice',
        avatar: 'https://i.pinimg.com/736x/b3/35/ec/b335ecd186e7a7e8913c41418ce9c9c0.jpg'
      },
      timestamp: new Date(Date.now() - 3600000),
      comments: 23,
      emojis: { '🚀': 12, '❤️': 8 }
    },
    {
      id: 2,
      text: 'Beautiful sunset coding session ☀️ #JavaScript #Coding',
      image: 'https://i.pinimg.com/736x/78/49/25/784925b2707ac85810965a0fcb0da88a.jpg',
      likes: 89,
      liked: true,
      saved: false,
      author: {
        username: 'john',
        avatar: 'https://i.pinimg.com/736x/78/49/25/784925b2707ac85810965a0fcb0da88a.jpg'
      },
      timestamp: new Date(Date.now() - 7200000),
      comments: 15,
      emojis: { '☀️': 6, '💻': 4 }
    }
  ];

  const locations = [
    { name: 'San Francisco, CA', posts: 2341 },
    { name: 'New York, NY', posts: 1987 },
    { name: 'London, UK', posts: 1654 },
    { name: 'Tokyo, Japan', posts: 1432 }
  ];

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const data = await userService.searchUsers(query);
      setSearchResults(data.users || []);
    } catch (error) {
      toast.error('Search failed');
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (userId) => {
    try {
      await userService.followUser(userId);
      toast.success('Following user!');
      // Update the user's following status in the results
      setSearchResults(prev => prev.map(user => 
        user._id === userId ? { ...user, isFollowing: true } : user
      ));
    } catch (error) {
      toast.error('Failed to follow user');
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return (
    <div className="explore-page">
      <div className="explore-header">
        <h1>Explore</h1>
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search users, topics, or posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {searchQuery && (
        <div className="search-results">
          <h2>Search Results for "{searchQuery}"</h2>
          {loading ? (
            <div className="loading-state">Searching...</div>
          ) : searchResults.length > 0 ? (
            <div className="users-grid">
              {searchResults.map(user => (
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
          ) : (
            <div className="empty-state">No users found</div>
          )}
        </div>
      )}

      {!searchQuery && (
        <>
          <div className="explore-tabs">
            <button 
              className={`explore-tab ${activeTab === 'trending' ? 'active' : ''}`}
              onClick={() => setActiveTab('trending')}
            >
              <TrendingUp size={20} /> Trending
            </button>
            <button 
              className={`explore-tab ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              <Users size={20} /> People
            </button>
            <button 
              className={`explore-tab ${activeTab === 'topics' ? 'active' : ''}`}
              onClick={() => setActiveTab('topics')}
            >
              <Hash size={20} /> Topics
            </button>
            <button 
              className={`explore-tab ${activeTab === 'locations' ? 'active' : ''}`}
              onClick={() => setActiveTab('locations')}
            >
              <MapPin size={20} /> Locations
            </button>
          </div>

          <div className="explore-content">
            {activeTab === 'trending' && (
              <TrendingSection user={user} />
            )}

            {activeTab === 'users' && (
              <SuggestedUsersSection />
            )}

            {activeTab === 'topics' && (
              <div className="topics-section">
                <h2>Trending Topics</h2>
                <div className="topics-grid">
                  {trendingTopics.map((topic, index) => (
                    <div key={topic.tag} className="topic-card">
                      <div className="topic-rank">#{index + 1}</div>
                      <div className="topic-info">
                        <h3>{topic.tag}</h3>
                        <p>{topic.posts.toLocaleString()} posts</p>
                        <span className="topic-growth">{topic.growth}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'locations' && (
              <div className="locations-section">
                <h2>Trending Locations</h2>
                <div className="locations-grid">
                  {locations.map((location, index) => (
                    <div key={location.name} className="location-card">
                      <div className="location-rank">#{index + 1}</div>
                      <div className="location-info">
                        <h3>{location.name}</h3>
                        <p>{location.posts.toLocaleString()} posts</p>
                      </div>
                      <MapPin size={24} className="location-icon" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Explore;