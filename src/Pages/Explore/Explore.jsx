import { useState } from "react";
import "./explore.css";

const Explore = () => {
  const [query, setQuery] = useState("");

  const users = [
    {
      username: "namisha",
      avatar:
        "https://i.pinimg.com/736x/b3/35/ec/b335ecd186e7a7e8913c41418ce9c9c0.jpg",
    },
  ];

  const posts = [
    "https://i.pinimg.com/736x/d5/ce/19/d5ce19ca7e57171009f0e210640c0985.jpg",
    "https://i.pinimg.com/736x/ea/e2/91/eae29154a567b88bb9b830f58a868e75.jpg",
    "https://i.pinimg.com/736x/78/49/25/784925b2707ac85810965a0fcb0da88a.jpg",
  ];

  return (
    <div className="explore-container">
      <input
        className="search-bar"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <h3>People</h3>
      <div className="user-grid">
        {users.map((u, i) => (
          <div className="user-card" key={i}>
            <img src={u.avatar} />
            <p>@{u.username}</p>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "2rem" }}>Trending</h3>
      <div className="post-grid">
        {posts.map((p, i) => (
          <img key={i} src={p} />
        ))}
      </div>
    </div>
  );
};

export default Explore;
