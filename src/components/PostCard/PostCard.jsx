import { useState } from 'react';
import { Heart, MessageCircle, Send } from 'lucide-react';
import './postCard.css';

const PostCard = ({ post, onCommentAdd }) => {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  // Safe fallback for user data
  const user = post.user || { name: 'Anonymous', avatar: 'https://via.placeholder.com/40' };
  const comments = post.comments || [];

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      user: { name: 'You', avatar: 'https://via.placeholder.com/30' },
      text: newComment.trim(),
      timestamp: new Date().toLocaleString()
    };

    onCommentAdd(post.id, comment);
    setNewComment('');
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <img src={user.avatar} alt={user.name} className="user-avatar" />
        <div className="user-info">
          <h4>{user.name}</h4>
          <span className="timestamp">{post.timestamp}</span>
        </div>
      </div>

      {post.caption && (
        <div className="post-caption">
          <p>{post.caption}</p>
        </div>
      )}

      {post.images && post.images.length > 0 && (
        <div className="post-images">
          {post.images.map((image, index) => (
            <img key={index} src={image} alt={`Post image ${index + 1}`} className="post-image" />
          ))}
        </div>
      )}

      <div className="post-actions">
        <button onClick={handleLike} className={`action-btn ${liked ? 'liked' : ''}`}>
          <Heart size={20} fill={liked ? 'red' : 'none'} color={liked ? 'red' : 'currentColor'} />
          <span>Like</span>
        </button>

        <button onClick={() => setShowComments(!showComments)} className="action-btn">
          <MessageCircle size={20} />
          <span>Comment ({comments.length})</span>
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          <div className="add-comment">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
              className="comment-input"
            />
            <button onClick={handleAddComment} className="comment-btn">
              <Send size={16} />
            </button>
          </div>

          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <img src={comment.user?.avatar || 'https://via.placeholder.com/30'} alt={comment.user?.name || 'User'} className="comment-avatar" />
                <div className="comment-content">
                  <div className="comment-header">
                    <strong>{comment.user?.name || 'Anonymous'}</strong>
                    <span className="comment-time">{comment.timestamp}</span>
                  </div>
                  <p>{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;