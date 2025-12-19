import { useState, useEffect } from "react";

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    // Replace with your API call
    setPosts([
      {
        _id: "1",
        text: "Welcome to SYNC!",
        user: { username: "Namisha" },
      },
    ]);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, loading, fetchPosts };
};
