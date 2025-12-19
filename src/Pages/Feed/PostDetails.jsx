import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, MessageCircle, Share, Bookmark } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { formatDistanceToNow } from "../../utils/formatDate";
import CommentSection from "../../components/CommentSection/CommentSection";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import "./postDetails.css";

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock post data
        const mockPost = {
          id: parseInt(id),
          text: "Just launched my new React project! 🚀 This has been months of hard work and I'm so excited to share it with everyone. The app features a modern UI, real-time updates, and seamless user experience. #ReactJS #WebDev #Launch",
          image: "https://i.pinimg.com/736x/ea/e2/91/eae29154a567b88bb9b830f58a868e75.jpg",
          likes: 156,
          liked: false,
          saved: false,
          author: {
            username: 'alice',
            avatar: 'https://i.pinimg.com/736x/b3/35/ec/b335ecd186e7a7e8913c41418ce9c9c0.jpg',
            bio: 'Frontend Developer | React Enthusiast',
            followers: 1234
          },
          timestamp: new Date(Date.now() - 3600000),
          comments: 23,
          emojis: { '🚀': 12, '❤️': 8, '🔥': 5, '👏': 3 },
          poll: null
        };
        
        setPost(mockPost);
      } catch (error) {
        toast.error("Failed to load post");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleLike = () => {
    if (!post) return;
    
    setPost(prev => ({
      ...prev,
      liked: !prev.liked,
      likes: prev.liked ? prev.likes - 1 : prev.likes + 1
    }));
    
    toast.success(post.liked ? 'Unliked' : 'Liked!');
  };

  const handleSave = () => {
    if (!post) return;
    
    setPost(prev => ({
      ...prev,
      saved: !prev.saved
    }));
    
    toast.success(post.saved ? 'Removed from saved' : 'Saved!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Post by @${post.author.username}`,
        text: post.text,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const reactToPost = (emoji) => {
    setPost(prev => ({
      ...prev,
      emojis: {
        ...prev.emojis,
        [emoji]: (prev.emojis[emoji] || 0) + 1
      }
    }));
  };

  if (loading) return <Loader />;
  if (!post) return <div className="error-state">Post not found</div>;

  return (
    <div className="post-details-page">
      <div className="post-details-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          <ArrowLeft size={20} />
          Back
        </button>
        <h1>Post</h1>
      </div>

      <div className="post-details-container">
        <div className="post-author-section">
          <Link to={`/profile/${post.author.username}`} className="author-link">
            <img src={post.author.avatar} alt={post.author.username} className="author-avatar" />
            <div className="author-info">
              <h2>@{post.author.username}</h2>
              <p>{post.author.bio}</p>
              <span>{post.author.followers} followers</span>
            </div>
          </Link>
          
          <div className="post-timestamp">
            <span>{formatDistanceToNow(post.timestamp)}</span>
          </div>
        </div>

        <div className="post-content-section">
          <div className="post-text">
            <p>{post.text}</p>
          </div>
          
          {post.image && (
            <div className="post-image-container">
              <img src={post.image} alt="Post content" className="post-image" />
            </div>
          )}
        </div>

        <div className="post-stats">
          <div className="stat-item">
            <strong>{post.likes}</strong> likes
          </div>
          <div className="stat-item">
            <strong>{post.comments}</strong> comments
          </div>
          <div className="stat-item">
            <strong>{Object.values(post.emojis).reduce((sum, count) => sum + count, 0)}</strong> reactions
          </div>
        </div>

        <div className="post-actions">
          <button 
            onClick={handleLike} 
            className={`action-btn ${post.liked ? 'liked' : ''}`}
          >
            <Heart size={20} fill={post.liked ? "currentColor" : "none"} />
            <span>Like</span>
          </button>
          
          <button className="action-btn">
            <MessageCircle size={20} />
            <span>Comment</span>
          </button>
          
          <button onClick={handleShare} className="action-btn">
            <Share size={20} />
            <span>Share</span>
          </button>
          
          <button 
            onClick={handleSave} 
            className={`action-btn ${post.saved ? 'saved' : ''}`}
          >
            <Bookmark size={20} fill={post.saved ? "currentColor" : "none"} />
            <span>Save</span>
          </button>
        </div>

        <div className="post-reactions">
          <h3>Reactions</h3>
          <div className="reactions-list">
            {Object.entries(post.emojis).map(([emoji, count]) => (
              <button 
                key={emoji}
                onClick={() => reactToPost(emoji)}
                className="reaction-item"
              >
                <span className="reaction-emoji">{emoji}</span>
                <span className="reaction-count">{count}</span>
              </button>
            ))}
          </div>
          
          <div className="add-reaction">
            {['😍', '😂', '😮', '😢', '😡', '👍'].map(emoji => (
              <button 
                key={emoji}
                onClick={() => reactToPost(emoji)}
                className="add-reaction-btn"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div className="post-comments-section">
          <CommentSection postId={post.id} />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;