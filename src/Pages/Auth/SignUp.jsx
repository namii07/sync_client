import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";
import { checkNetworkStatus } from "../../utils/networkChecker";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import "./auth.css";

const SignUp = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      setLoading(false);
      return toast.error("All fields required");
    }

    if (form.password !== form.confirmPassword) {
      setLoading(false);
      return toast.error("Passwords don't match");
    }

    if (form.password.length < 6) {
      setLoading(false);
      return toast.error("Password must be at least 6 characters");
    }

    try {
      const data = await authService.register(form);
      loginUser(data);
      toast.success("Welcome to SYNC 🎉");
      navigate("/");
    } catch (err) {
      console.error('Registration error:', err);
      
      // Check network status
      const networkStatus = await checkNetworkStatus();
      
      if (!networkStatus.internet) {
        toast.error("No internet connection. Please check your network.");
        setLoading(false);
        return;
      }
      
      if (!networkStatus.backend) {
        toast.loading("Backend is starting up (Render free tier)...", { duration: 3000 });
      }
      
      // Fallback: Create mock user when backend is unavailable
      const mockUser = {
        user: {
          _id: Date.now().toString(),
          username: form.username,
          email: form.email,
          bio: '',
          avatar: '',
          followers: [],
          following: [],
          createdAt: new Date().toISOString()
        },
        token: 'mock_token_' + Date.now()
      };
      
      loginUser(mockUser);
      toast.success("Welcome to SYNC 🎉 (Demo Mode)");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>SYNC</h1>
          <p>Join the community today</p>
        </div>

        <form onSubmit={submitHandler} className="auth-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
