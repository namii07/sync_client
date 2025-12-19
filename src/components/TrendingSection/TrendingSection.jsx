import { useState, useEffect } from 'react';
import { postService } from '../../services/postService';
import PostCard from '../PostCard/PostCard';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';

const TrendingSection = ({ user }) => {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const data = await postService.getTrendingPosts();
        setTrendingPosts(data.posts || []);
      } catch (error) {
        toast.error('Failed to load trending posts');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingPosts();
  }, [user]);

  const handleLike = async (postId) => {
    try {
      const post = trendingPosts.find(p => p._id === postId);
      if (post.isLiked) {
        await postService.unlikePost(postId);
      } else {
        await postService.likePost(postId);
      }
      
      setTrendingPosts(prev => prev.map(p => 
        p._id === postId 
          ? { 
              ...p, 
              isLiked: !p.isLiked,
              likesCount: p.isLiked ? p.likesCount - 1 : p.likesCount + 1
            }
          : p
      ));
    } catch (error) {
      toast.error('Failed to update like');
    }
  };

  const handleSave = async (postId) => {
    try {
      const post = trendingPosts.find(p => p._id === postId);
      if (post.isSaved) {
        await postService.unsavePost(postId);
      } else {
        await postService.savePost(postId);
      }
      
      setTrendingPosts(prev => prev.map(p => 
        p._id === postId ? { ...p, isSaved: !p.isSaved } : p
      ));
    } catch (error) {
      toast.error('Failed to update save status');
    }
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
              onLike={handleLike}
              onSave={handleSave}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TrendingSection;