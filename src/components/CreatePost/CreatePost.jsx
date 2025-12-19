import { useState } from "react";
import "./createPost.css";

const CreatePost = ({ setPosts }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImage = e => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const submitPost = () => {
    setPosts(prev => [
      {
        id: Date.now(),
        text,
        image: preview,
        likes: 0,
        emojis: {},
      },
      ...prev
    ]);
    setText("");
    setPreview(null);
  };

  return (
    <div className="create-post">
      <textarea
        placeholder="What's happening?"
        value={text}
        onChange={e => setText(e.target.value)}
      />

      {preview && <img src={preview} className="preview" />}

      <div className="actions">
        <input type="file" onChange={handleImage} />
        <button onClick={submitPost}>Post</button>
      </div>
    </div>
  );
};

export default CreatePost;
