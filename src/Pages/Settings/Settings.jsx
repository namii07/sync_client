import "./settings.css";

const Settings = () => {
  return (
    <div className="settings-container">
      <h2>Settings</h2>

      <section>
        <h4>Change Password</h4>
        <input placeholder="New password" type="password" />
        <button>Update Password</button>
      </section>

      <section>
        <h4>Theme</h4>
        <button>Toggle Pastel Theme</button>
      </section>

      <section>
        <h4>Sessions</h4>
        <button className="danger">Logout All Devices</button>
      </section>

      <section>
        <h4>Danger Zone</h4>
        <button className="danger">Delete Account</button>
      </section>
    </div>
  );
};

export default Settings;
