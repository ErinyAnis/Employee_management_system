import { useNavigate } from "react-router-dom";
import Btn from "../ui/Btn";
import Container from "../ui/Container";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  passwordChangeSchema,
  TPasswordChangeSchema,
} from "../../../lib/types";
import { useForm } from "react-hook-form";

const Setting = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TPasswordChangeSchema>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TPasswordChangeSchema) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/setting/change-password`,
        { userId: user?._id, ...data },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response.data.success) {
        toast.success("Successfully changed password");
        if (user?.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      let errorMessage = "Failed to change password";

      if (axios.isAxiosError(error)) {
        if (error.response) {
          errorMessage = error.response?.data?.error || errorMessage;
        } else if (error.request) {
          errorMessage = "No response from server";
        }
      }
      toast.error(errorMessage);
    }
  };

  return (
    <Container className="mt-10 max-w-xl rounded-md bg-white p-8 shadow-md lg:mt-20">
      <h2 className="mb-6 text-2xl font-bold">Change password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-3">
          <div>
            <label htmlFor="oldPassword" className="label">
              Old Password
            </label>
            <input
              type="password"
              className="input"
              placeholder="old password"
              {...register("oldPassword")}
            />
            {errors.oldPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.oldPassword.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="newPassword" className="label">
              New Password
            </label>
            <input
              type="password"
              className="input"
              placeholder="new password"
              {...register("newPassword")}
            />
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.newPassword.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="label">
              Confirm Password
            </label>
            <input
              type="password"
              className="input"
              placeholder="confirm password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
        <div className="mt-6 text-center">
          <Btn type="submit" className="px-5" disabled={isSubmitting}>
            {isSubmitting ? "Changing..." : "Change password"}
          </Btn>
        </div>
      </form>
    </Container>
  );
};

export default Setting;
