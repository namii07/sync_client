import { useState, useEffect } from "react";
import CreatePost from "../../components/CreatePost/CreatePost";
import PostCard from "../../components/PostCard/PostCard";
import Loader from "../../components/Loader/Loader";
import "../../styles/feed.css";
import './Home.css';


const sampleImages = [
  "https://i.pinimg.com/736x/d5/ce/19/d5ce19ca7e57171009f0e210640c0985.jpg",
  "https://i.pinimg.com/736x/ea/e2/91/eae29154a567b88bb9b830f58a868e75.jpg",
  "https://i.pinimg.com/736x/78/49/25/784925b2707ac85810965a0fcb0da88a.jpg",
  "https://i.pinimg.com/736x/51/da/e4/51dae45486f8cdf2a37067a5439bdc7f.jpg",
  "https://i.pinimg.com/736x/79/43/71/7943717da21e8e5354786e0441e00f54.jpg",
  "https://i.pinimg.com/1200x/9e/41/65/9e4165236df736c00b13f2bbb330de6f.jpg"
];

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPosts([
        {
          id: 1,
          text: "Pastel vibes only ✨",
          image: sampleImages[0],
          likes: 24,
          emojis: { "❤️": 5, "🔥": 3 },
          poll: {
            question: "Best UI theme?",
            options: ["Dark", "Pastel", "Neon"],
            votes: [4, 12, 3]
          }
        }
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  return (
    <div className="feed-container">
      <CreatePost setPosts={setPosts} />

      {loading && <Loader />}

      {!loading && posts.length === 0 && (
        <div className="empty-feed">
          <h3>No posts yet 🌸</h3>
          <p>Create your first post</p>
        </div>
      )}

      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Home;
