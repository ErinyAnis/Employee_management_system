import axios from "axios";
import { toast } from "react-toastify";
import { Employee } from "../types/Employee";

export const fetchEmployees = async (id: string) => {
  let employees: Employee[] = [];
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    if (response.data.success && response.data.employees.length > 0) {
      employees = response.data.employees;
    } else if (response.data.employees.length < 0) {
      toast.error("no employees found");
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to fetch employees");
  }
  return employees;
};
