import "./notifications.css";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: "like",
      user: "alice",
      avatar:
        "https://i.pinimg.com/736x/b3/35/ec/b335ecd186e7a7e8913c41418ce9c9c0.jpg",
      read: false,
    },
  ];

  const icons = {
    like: "❤️",
    comment: "💬",
    follow: "➕",
  };

  return (
    <div className="notification-page">
      <h2>Notifications</h2>

      {notifications.map((n) => (
        <div
          key={n.id}
          className={`notification-card ${!n.read && "unread"}`}
        >
          <img src={n.avatar} />
          <p>
            {icons[n.type]} <b>@{n.user}</b> {n.type} your post
          </p>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
