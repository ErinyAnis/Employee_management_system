import axios from "axios";
import { toast } from "react-toastify";

export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/department`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to fetch departments");
  }
  return departments;
};