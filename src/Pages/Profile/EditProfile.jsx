import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

const EditProfile = () => {
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState(
    "https://i.pinimg.com/736x/b3/35/ec/b335ecd186e7a7e8913c41418ce9c9c0.jpg"
  );
  const [bio, setBio] = useState("Building SYNC ✨ | React & MERN");

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    setAvatar(URL.createObjectURL(file));
  };

  const saveProfile = () => {
    // API call later
    navigate("/profile/namisha");
  };

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>

      <img src={avatar} className="profile-avatar" />

      <input type="file" onChange={handleAvatar} />

      <label>Bio</label>
      <textarea
        rows="4"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      <button onClick={saveProfile}>Save Changes</button>
    </div>
  );
};

export default EditProfile;
