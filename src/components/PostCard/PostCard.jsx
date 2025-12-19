import { useState } from 'react';
import { likePost, commentOnPost, deletePost } from '../../api/posts';
import { Heart, MessageCircle, Trash2, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import './postCard.css';

const PostCard = ({ post, currentUser, onPostDeleted }) => {
  const [liked, setLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(post.comments || []);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    try {
      await likePost(post._id);
      setLiked(!liked);
      setLikesCount(prev => liked ? prev - 1 : prev + 1);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleComment = async () => {
    if (!newComment.trim()) return;
    
    setLoading(true);
    try {
      const comment = await commentOnPost(post._id, newComment.trim());
      setComments(prev => [...prev, comment]);
      setNewComment('');
      toast.success('Comment added!');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(post._id);
        onPostDeleted(post._id);
        toast.success('Post deleted!');
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const isOwnPost = currentUser?._id === post.author?._id;

  return (
    <div className="post-card">
      <div className="post-header">
        <img src={post.author?.avatar} alt={post.author?.username} className="user-avatar" />
        <div className="user-info">
          <h4>{post.author?.username}</h4>
          <span className="timestamp">{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        {isOwnPost && (
          <button onClick={handleDelete} className="delete-btn">
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {post.content && (
        <div className="post-content">
          <p>{post.content}</p>
        </div>
      )}

      {post.image && (
        <div className="post-image">
          <img src={post.image} alt="Post" />
        </div>
      )}

      <div className="post-actions">
        <button onClick={handleLike} className={`action-btn ${liked ? 'liked' : ''}`}>
          <Heart size={20} fill={liked ? 'red' : 'none'} color={liked ? 'red' : 'currentColor'} />
          <span>{likesCount}</span>
        </button>

        <button onClick={() => setShowComments(!showComments)} className="action-btn">
          <MessageCircle size={20} />
          <span>{comments.length}</span>
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
              onKeyPress={(e) => e.key === 'Enter' && handleComment()}
            />
            <button onClick={handleComment} disabled={loading}>
              <Send size={16} />
            </button>
          </div>

          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment._id} className="comment">
                <img src={comment.user?.avatar} alt={comment.user?.username} className="comment-avatar" />
                <div className="comment-content">
                  <strong>{comment.user?.username}</strong>
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