import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Container from "../components/ui/Container";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TLoginSchema, loginSchema } from "../../lib/types";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { login, user, loading } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: TLoginSchema) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        { email: data.email, password: data.password },
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
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "Server Error");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    if (!loading && user?.role === "admin") {
      navigate("/admin-dashboard");
      return;
    }
  }, [user, loading, navigate]);

  return (
    <Container className="flex h-screen flex-col items-center justify-center space-y-7 bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50%">
      <h1 className="font-signika mb-5 text-2xl text-white lg:mb-10 lg:text-4xl">
        Employee Management System
      </h1>
      <div className="w-[90%] rounded-sm border border-gray-400 bg-white p-6 shadow sm:w-[60%] md:w-[40%] lg:w-[35%] xl:w-[28%]">
        <h2 className="mb-4 text-2xl font-bold">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="mb-1 block text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter Email"
              className="w-full rounded-sm border px-3 py-2"
            />
            {errors.email && (
              <p className="mt-1 text-red-500">{`${errors.email.message}`}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="mb-1 block text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="*******"
              className="w-full rounded-sm border px-3 py-2"
            />
            {errors.password && (
              <p className="mt-1 text-red-500">{`${errors.password.message}`}</p>
            )}
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
              disabled={isSubmitting}
              className="w-full cursor-pointer rounded-sm bg-teal-600 py-2 text-white transition duration-300 hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-gray-500"
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
