import { useState } from "react";
import { signup } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const SignUp = () => {
  const { loginUser } = useAuth();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password) {
      return toast.error("All fields required");
    }

    try {
      const { data } = await signup(form);
      loginUser(data);
      toast.success("Account created 🎉");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={submitHandler}>
        <input
          placeholder="Username"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
