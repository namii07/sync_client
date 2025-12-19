import { useState } from "react";
import "./postCard.css";

const emojis = ["❤️", "🔥", "😂", "👏"];

const PostCard = ({ post }) => {
  const [reactions, setReactions] = useState(post.emojis || {});

  const react = emoji => {
    setReactions(prev => ({
      ...prev,
      [emoji]: (prev[emoji] || 0) + 1
    }));
  };

  return (
    <div className="post-card">
      <p>{post.text}</p>

      {post.image && <img src={post.image} />}

      {post.poll && (
        <div className="poll">
          <h4>{post.poll.question}</h4>
          {post.poll.options.map((opt, i) => (
            <button key={i}>
              {opt} ({post.poll.votes[i]})
            </button>
          ))}
        </div>
      )}

      <div className="reactions">
        {emojis.map(e => (
          <span key={e} onClick={() => react(e)}>
            {e} {reactions[e] || 0}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PostCard;
