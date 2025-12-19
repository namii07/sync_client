import { useState } from "react";
import CreatePost from "../../components/CreatePost/CreatePost";
import PostCard from "../../components/PostCard/PostCard";
import "../../styles/feed.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  
  const user = {
    name: "You",
    avatar: "https://i.pinimg.com/736x/b3/35/ec/b335ecd186e7a7e8913c41418ce9c9c0.jpg"
  };

  const handlePostCreate = (newPost) => {
    setPosts(prev => [newPost, ...prev]);
    alert('Post created successfully! 🎉');
  };

  const handleCommentAdd = (postId, comment) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, comment] }
        : post
    ));
  };

  return (
    <div className="feed-container">
      <div className="feed-header">
        <h1>Social Media Feed</h1>
      </div>
      
      <CreatePost onPostCreate={handlePostCreate} user={user} />
      
      <div className="posts-feed">
        {posts.length === 0 ? (
          <div className="no-posts">
            <p>No posts yet. Create your first post above! 📸</p>
          </div>
        ) : (
          posts.map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              onCommentAdd={handleCommentAdd}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
