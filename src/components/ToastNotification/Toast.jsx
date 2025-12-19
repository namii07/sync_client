import "./Toast.css";

const Toast = ({ message }) => (
  <div
    style={{
      position: "fixed",
      bottom: "1rem",
      right: "1rem",
      background: "#ddd6fe",
      padding: "1rem",
      borderRadius: "16px",
    }}
  >
    {message}
  </div>
);

export default Toast;
