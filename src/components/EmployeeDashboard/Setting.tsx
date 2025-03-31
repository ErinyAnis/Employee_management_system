import { useNavigate } from "react-router-dom";
import Btn from "../ui/Btn";
import Container from "../ui/Container";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

type Setting = {
  userId: string | undefined;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const Setting = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [setting, setSetting] = useState<Setting>({
    userId: user?._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (setting.newPassword !== setting.confirmPassword) {
      setError("passwords do not match");
      toast.error(error);
    } else {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/setting/change-password`,
          setting,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (response.data.success) {
          toast.success("Successfully changed password");
          navigate("/");
          setError("");
        }
      } catch (error) {
        let errorMessage = "An error occurred";

        if (axios.isAxiosError(error)) {
          if (error.response) {
            errorMessage = error.response.data.error || "Request failed";
          } else if (error.request) {
            errorMessage = "No response from server";
          }
        }
        setError(errorMessage);
        toast.error(errorMessage);
      }
    }
  };

  return (
    <Container className="mt-10 max-w-xl rounded-md bg-white p-8 shadow-md lg:mt-20">
      <h2 className="mb-6 text-2xl font-bold">Change password</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-3">
          <div>
            <label htmlFor="oldPassword" className="label">
              Old Password
            </label>
            <input
              type="password"
              name="oldPassword"
              onChange={handleChange}
              className="input"
              placeholder="old password"
              required
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="label">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              onChange={handleChange}
              className="input"
              placeholder="new password"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="label">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              className="input"
              placeholder="confirm password"
              required
            />
          </div>
        </div>
        <p className="mt-3 text-red-500">{error}</p>
        <div className="mt-6 text-center">
          <Btn type="submit" className="px-5">
            Change password
          </Btn>
        </div>
      </form>
    </Container>
  );
};

export default Setting;
