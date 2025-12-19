import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./layout.css";

const Layout = ({ children }) => {
  const { user } = useAuth();
  const { theme } = useTheme();

  if (!user) return children;

  return (
    <div className={`app-layout ${theme}`}>
      <Navbar />
      <div className="layout-content">
        <Sidebar />
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;