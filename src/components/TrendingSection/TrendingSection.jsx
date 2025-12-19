import { useState, useEffect } from 'react';
import { getFeedPosts, likePost, commentOnPost } from '../../api/posts';
import PostCard from '../PostCard/PostCard';
import Loader from '../Loader/Loader';
import { mockPosts } from '../../utils/mockData';
import toast from 'react-hot-toast';

const TrendingSection = ({ user }) => {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const data = await getFeedPosts();
        setTrendingPosts(data.posts || []);
      } catch (error) {
        console.error('Failed to load trending posts:', error);
        setTrendingPosts(mockPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingPosts();
  }, [user]);

  const handlePostDeleted = (postId) => {
    setTrendingPosts(prev => prev.filter(post => post._id !== postId));
  };

  if (loading) return <Loader />;

  return (
    <div className="trending-section">
      <h2>Trending Posts</h2>
      <div className="posts-list">
        {trendingPosts.length === 0 ? (
          <p>No trending posts yet</p>
        ) : (
          trendingPosts.map(post => (
            <PostCard 
              key={post._id} 
              post={post} 
              currentUser={user}
              onPostDeleted={handlePostDeleted}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TrendingSection;