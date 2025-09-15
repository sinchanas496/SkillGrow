// client/src/pages/AuthPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function AuthPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const reset = () => {
    setName("");
    setEmail("");
    setPassword("");
    setErr("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const payload = isLogin
        ? { email, password }
        : { name, email, password };

      const { data } = await API.post(endpoint, payload);

      // Save token and user
      if (data?.token) localStorage.setItem("token", data.token);
      if (data?.user && typeof onLogin === "function") onLogin(data.user);

      // Go to dashboard (your App.jsx expects /home)
      navigate("/home");
      reset();
    } catch (error) {
      const msg =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Something went wrong";
      setErr(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center mb-4">
          {isLogin ? "Login" : "Create an Account"}
        </h1>

        {err && (
          <div className="mb-3 text-sm text-red-600 border border-red-200 bg-red-50 p-2 rounded">
            {err}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {!isLogin && (
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="Your name"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded px-4 py-2 disabled:opacity-60"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsLogin((s) => !s);
              setErr("");
            }}
            className="text-indigo-600 underline"
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
}
