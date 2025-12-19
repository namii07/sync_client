import { useState } from "react";
import { login } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const { loginUser } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return toast.error("All fields required");
    }

    try {
      const { data } = await login(form);
      loginUser(data);
      toast.success("Welcome back to SYNC 💜");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <img
        src="https://i.pinimg.com/1200x/16/6a/0c/166a0ce0aab24c672994e7f2e20ee425.jpg"
        alt="SYNC Logo"
      />
      <form onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
