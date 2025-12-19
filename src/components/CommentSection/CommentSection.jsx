import { useState } from "react";
import "./commentSection.css";

const CommentSection = ({ comments = [] }) => {
  return (
    <div className="comments">
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <img src={comment.user?.avatar || 'https://via.placeholder.com/30'} alt={comment.user?.name || 'User'} className="comment-avatar" />
          <div className="comment-content">
            <div className="comment-header">
              <b>{comment.user?.name || 'Anonymous'}</b>
              <span className="comment-time">{comment.timestamp}</span>
            </div>
            <p>{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
