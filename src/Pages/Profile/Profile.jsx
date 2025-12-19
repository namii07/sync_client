import { Link } from "react-router-dom";
import "./profile.css";

const Profile = () => {
  const isOwnProfile = true;

  const user = {
    username: "namisha",
    avatar:
      "https://i.pinimg.com/736x/b3/35/ec/b335ecd186e7a7e8913c41418ce9c9c0.jpg",
    bio: "Building SYNC ✨ | React & MERN",
    followers: 124,
    following: 98,
    posts: [
      "https://i.pinimg.com/736x/ea/e2/91/eae29154a567b88bb9b830f58a868e75.jpg",
      "https://i.pinimg.com/736x/78/49/25/784925b2707ac85810965a0fcb0da88a.jpg",
      "https://i.pinimg.com/736x/51/da/e4/51dae45486f8cdf2a37067a5439bdc7f.jpg",
    ],
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={user.avatar} className="profile-avatar" />

        <div className="profile-info">
          <h2>@{user.username}</h2>
          <p>{user.bio}</p>

          <div className="profile-stats">
            <span>{user.posts.length} Posts</span>
            <span>{user.followers} Followers</span>
            <span>{user.following} Following</span>
          </div>

          <div className="profile-actions">
            {isOwnProfile ? (
              <Link to="/profile/edit">
                <button className="secondary">Edit Profile</button>
              </Link>
            ) : (
              <button>Follow</button>
            )}
          </div>
        </div>
      </div>

      <div className="profile-posts">
        {user.posts.map((img, i) => (
          <img key={i} src={img} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
