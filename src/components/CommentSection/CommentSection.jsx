import { useEffect, useState } from "react";
import Toast from "../ToastNotification/Toast";
import "./commentSection.css";

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setComments([
      { id: 1, user: "alice", text: "Beautiful UI 💜" },
      { id: 2, user: "john", text: "Love this!" },
    ]);
  }, [postId]);

  const addComment = () => {
    setComments([{ id: Date.now(), user: "you", text }, ...comments]);
    setText("");
    setToast("Comment added!");
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
        <button onClick={addComment}>Post</button>
      </div>

      {comments.map((c) => (
        <div className="comment" key={c.id}>
          <b>@{c.user}</b> {c.text}
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
