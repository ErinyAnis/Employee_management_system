import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Container from "../components/ui/Container";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user?.role === "admin") {
      navigate("/admin-dashboard");
      return;
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        { email, password },
      );

      if (response.data.success) {
        toast.success("Successfully logged in");
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      const err = error as AxiosError<{ success: boolean; error: string }>;
      if (err.response && !err.response.data.success) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Server Error");
      }
    }
  };

  return (
    <Container className="flex h-screen flex-col items-center justify-center space-y-7 bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50%">
      <h1 className="font-signika text-2xl text-white lg:text-4xl mb-5 lg:mb-10">
        Employee Management System
      </h1>
      <div className="w-[90%] sm:w-[60%] md:w-[40%] lg:w-[35%] xl:w-[28%] rounded-sm border border-gray-400 bg-white p-6 shadow">
        <h2 className="mb-4 text-2xl font-bold">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="mb-1 block text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full rounded-sm border px-3 py-2"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="mb-1 block text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="*******"
              className="w-full rounded-sm border px-3 py-2"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 flex items-center justify-between text-sm">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mt-[1.5px] cursor-pointer"
              />
              <span className="ml-1 text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-teal-600">
              Forgot Password
            </a>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full cursor-pointer rounded-sm bg-teal-600 py-2 text-white transition duration-300 hover:bg-teal-800"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Login;
