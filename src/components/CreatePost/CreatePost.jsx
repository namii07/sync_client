import { useState } from 'react';
import { X, Image, Send } from 'lucide-react';
import './createPost.css';

const CreatePost = ({ onPostCreate, user }) => {
  const [caption, setCaption] = useState('');
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages(prev => [...prev, file]);
        setPreviews(prev => [...prev, event.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handlePost = () => {
    if (!caption.trim() && images.length === 0) {
      alert('Please add a caption or image!');
      return;
    }

    const newPost = {
      id: Date.now(),
      user: {
        name: user?.name || 'You',
        avatar: user?.avatar || 'https://i.pinimg.com/736x/b3/35/ec/b335ecd186e7a7e8913c41418ce9c9c0.jpg'
      },
      caption: caption.trim(),
      images: previews,
      timestamp: new Date().toLocaleString(),
      comments: []
    };

    onPostCreate(newPost);
    setCaption('');
    setImages([]);
    setPreviews([]);
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
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="caption-input"
        />
      </div>

      {previews.length > 0 && (
        <div className="image-previews">
          {previews.map((preview, index) => (
            <div key={index} className="preview-container">
              <img src={preview} alt={`Preview ${index + 1}`} className="preview-image" />
              <button 
                onClick={() => removeImage(index)} 
                className="remove-btn"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="post-actions">
        <label className="image-upload-btn">
          <Image size={20} />
          <span>Photo</span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </label>

        <button onClick={handlePost} className="post-btn">
          <Send size={16} />
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;