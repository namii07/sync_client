import { useEffect, useState } from "react";
import { postService } from "../../services/postService";
import { useAuth } from "../../context/AuthContext";
import { formatDistanceToNow } from "../../utils/formatDate";
import Toast from "../ToastNotification/Toast";
import toast from "react-hot-toast";
import "./commentSection.css";

const CommentSection = ({ postId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await postService.getComments(postId);
        setComments(data.comments || []);
      } catch (error) {
        console.error('Failed to load comments:', error);
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const addComment = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    try {
      const newComment = await postService.addComment(postId, { text: text.trim() });
      setComments(prev => [newComment, ...prev]);
      setText("");
      toast.success("Comment added!");
    } catch (error) {
      toast.error('Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comments">
      {toast && <Toast message={toast} />}

      <div className="add-comment">
        <input
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addComment} disabled={loading || !text.trim()}>
          {loading ? 'Posting...' : 'Post'}
        </button>
      </div>

      {comments.map((comment) => (
        <div className="comment" key={comment._id}>
          <img src={comment.user?.avatar} alt={comment.user?.username} className="comment-avatar" />
          <div className="comment-content">
            <div className="comment-header">
              <b>@{comment.user?.username}</b>
              <span className="comment-time">{formatDistanceToNow(comment.timestamp)}</span>
            </div>
            <p>{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
