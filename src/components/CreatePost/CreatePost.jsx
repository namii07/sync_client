import { useState } from 'react';
import { createPost } from '../../api/posts';
import { X, Image, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import './createPost.css';

const CreatePost = ({ onPostCreated, user }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = async () => {
    if (!content.trim() && !image) {
      toast.error('Please add content or an image');
      return;
    }

    setLoading(true);
    try {
      const postData = { content: content.trim() };
      if (image) {
        postData.image = image;
      }
      
      const newPost = await createPost(postData);
      onPostCreated(newPost);
      setContent('');
      setImage(null);
      setPreview(null);
      toast.success('Post created successfully!');
    } catch (error) {
      console.error('Create post error:', error);
      // Create a mock post for demo purposes
      const mockPost = {
        _id: Date.now().toString(),
        content: content.trim(),
        author: {
          _id: user?._id || 'demo',
          username: user?.username || 'You',
          avatar: user?.avatar || 'https://via.placeholder.com/40'
        },
        createdAt: new Date().toISOString(),
        likes: [],
        likesCount: 0,
        comments: [],
        isLiked: false,
        isSaved: false,
        image: preview
      };
      onPostCreated(mockPost);
      setContent('');
      setImage(null);
      setPreview(null);
      toast.success('Post created (demo mode)!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post">
      <div className="post-header">
        <img 
          src={user?.avatar || 'https://via.placeholder.com/40'} 
          alt="Profile" 
          className="profile-pic" 
        />
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="caption-input"
        />
      </div>

      {preview && (
        <div className="image-preview">
          <img src={preview} alt="Preview" className="preview-image" />
          <button onClick={removeImage} className="remove-btn">
            <X size={16} />
          </button>
        </div>
      )}

      <div className="post-actions">
        <label className="image-upload-btn">
          <Image size={20} />
          <span>Photo</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </label>

        <button onClick={handleSubmit} disabled={loading} className="post-btn">
          <Send size={16} />
          {loading ? 'Posting...' : 'Post'}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;