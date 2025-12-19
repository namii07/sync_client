import { useState, useEffect } from 'react';
import { getFeedPosts } from '../../api/posts';
import { useAuth } from '../../context/AuthContext';
import CreatePost from '../../components/CreatePost/CreatePost';
import PostCard from '../../components/PostCard/PostCard';
import Loader from '../../components/Loader/Loader';
import { mockPosts } from '../../utils/mockData';
import '../../styles/feed.css';

const Home = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const data = await getFeedPosts();
        setPosts(data.posts || []);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        setPosts(mockPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  const handlePostCreated = (newPost) => {
    setPosts(prev => [newPost, ...prev]);
  };

  const handlePostDeleted = (postId) => {
    setPosts(prev => prev.filter(post => post._id !== postId));
  };

  if (!user) {
    return (
      <div className="feed-container">
        <div className="no-posts">
          <p>Please log in to view posts</p>
        </div>
      </div>
    );
  }

  if (loading) return <Loader />;

  return (
    <div className="feed-container">
      <CreatePost onPostCreated={handlePostCreated} user={user} />
      
      <div className="posts-feed">
        {posts.length === 0 ? (
          <div className="no-posts">
            <p>No posts yet. Create your first post!</p>
          </div>
        ) : (
          posts.map(post => (
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

export default Home;
