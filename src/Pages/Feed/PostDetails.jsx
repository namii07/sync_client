import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PostCard from "../../components/PostCard/PostCard";
import CommentSection from "../../components/CommentSection/CommentSection";
import Loader from "../../components/Loader/Loader";
import "../../styles/feed.css";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // replace with API later
    setTimeout(() => {
      setPost({
        id,
        text: "Full post view 🌸",
        image:
          "https://i.pinimg.com/736x/79/43/71/7943717da21e8e5354786e0441e00f54.jpg",
        likes: 32,
        commentsCount: 5,
      });
    }, 600);
  }, [id]);

  if (!post) return <Loader />;

  return (
    <div className="feed-container">
      <PostCard post={post} detailed />
      <CommentSection postId={id} />
    </div>
  );
};

export default PostDetails;
