import "./admin.css";

const AdminDashboard = () => {
  const users = ["namisha", "alice", "john"];

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>

      <div className="admin-card">
        <h4>Total Users</h4>
        <p>1,245</p>
      </div>

      <h3>Users</h3>
      {users.map((u) => (
        <div className="admin-user" key={u}>
          @{u}
          <button>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
