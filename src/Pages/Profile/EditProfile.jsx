import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { userService } from "../../services/userService";
import { Camera, Save, X } from "lucide-react";
import toast from "react-hot-toast";
import "./editProfile.css";

const EditProfile = () => {
  const { user, loginUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');
  const [coverPreview, setCoverPreview] = useState('');
  
  const [formData, setFormData] = useState({
    username: user?.username || '',
    bio: user?.bio || '',
    location: user?.location || '',
    website: user?.website || '',
    avatar: null,
    cover: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      setFormData(prev => ({ ...prev, avatar: file }));
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Cover image size should be less than 10MB');
        return;
      }
      
      setFormData(prev => ({ ...prev, cover: file }));
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updateData = new FormData();
      updateData.append('username', formData.username);
      updateData.append('bio', formData.bio);
      updateData.append('location', formData.location);
      updateData.append('website', formData.website);
      
      if (formData.avatar) {
        updateData.append('avatar', formData.avatar);
      }
      
      if (formData.cover) {
        updateData.append('cover', formData.cover);
      }
      
      const updatedUser = await userService.updateProfile(updateData);
      loginUser({ user: updatedUser, token: localStorage.getItem('syncToken') });
      toast.success('Profile updated successfully!');
      navigate('/profile');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-header">
        <h1>Edit Profile</h1>
        <div className="header-actions">
          <button onClick={handleCancel} className="cancel-btn">
            <X size={20} />
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            className="save-btn"
            disabled={loading}
          >
            <Save size={20} />
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="edit-profile-form">
        <div className="profile-images-section">
          <div className="cover-image-container">
            <div className="cover-image">
              {coverPreview ? (
                <img src={coverPreview} alt="Cover preview" />
              ) : (
                <div className="cover-placeholder">
                  <Camera size={40} />
                  <span>Add cover photo</span>
                </div>
              )}
            </div>
            <label className="cover-upload-btn">
              <Camera size={20} />
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
                hidden
              />
            </label>
          </div>

          <div className="avatar-container">
            <div className="avatar-image">
              <img src={avatarPreview} alt="Avatar preview" />
            </div>
            <label className="avatar-upload-btn">
              <Camera size={16} />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                hidden
              />
            </label>
          </div>
        </div>

        <div className="form-fields">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Tell us about yourself..."
              rows={4}
              maxLength={160}
            />
            <span className="char-count">{formData.bio.length}/160</span>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Where are you located?"
            />
          </div>

          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              placeholder="https://yourwebsite.com"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={handleCancel} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;