import { useState } from "react";
import axios from "axios";

const LoginForm = ({
  onLoginSuccess,
}: {
  onLoginSuccess: (token: string) => void;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth", { username, password });
      const { access, refresh } = response.data;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      onLoginSuccess(access);
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg"
      >
        <h2 className="mb-6 text-center text-2xl font-bold">Login</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border p-3 focus:border-blue-300 focus:outline-none focus:ring"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border p-3 focus:border-blue-300 focus:outline-none focus:ring"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-500 p-3 text-white transition duration-200 hover:bg-blue-600"
        >
          Login
        </button>
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
