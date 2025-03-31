import { useEffect, useState } from "react";
import Btn from "../ui/Btn";
import Container from "../ui/Container";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Employee } from "../../types/Employee";
import { fetchDepartments } from "../../utils/fetchDepartments";
import { Department } from "../../types/Department";

const Edit = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  // ** get Employee
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (response.data.success && response.data.employee) {
          setEmployee(response.data.employee);
        } else {
          toast.error("Employee not found");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong in fetching employee");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  // ** get the departments
  useEffect(() => {
    const fetchData = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments || []);
    };
    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "name") {
      // Update the nested `userId.name` field
      setEmployee((prev) =>
        prev ? { ...prev, userId: { ...prev.userId, name: value } } : null,
      );
    } else if (name === "department") {
      // Find the selected department from the `departments` array
      const selectedDepartment = departments.find((dep) => dep._id === value);

      // Update the `employee` state with the selected department
      setEmployee((prev) =>
        prev
          ? { ...prev, department: selectedDepartment || { dep_name: "" } }
          : null,
      );
    } else {
      // Update other fields directly
      setEmployee((prev) => (prev ? { ...prev, [name]: value } : null));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!employee) {
      toast.error("Employee data is missing");
      return;
    }

    try {
      // Prepare the payload
      const payload = {
        name: employee.userId?.name,
        maritalStatus: employee.maritalStatus,
        designation: employee.designation,
        salary: employee.salary,
        department: employee.department?._id, // Send only the department ID
      };

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/employee/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.success) {
        toast.success("Employee updated successfully");
        navigate("/admin-dashboard/employees");
      } else {
        toast.error("Failed to update employee");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Something went wrong while updating employee");
    }
  };

  return (
    <Container className="mt-5">
      <div className="mx-5 max-w-4xl rounded-md bg-white p-8 shadow-md">
        {loading ? (
          <div>Loading...</div>
        ) : employee ? (
          <>
            <h2 className="mb-6 text-2xl font-bold">Edit Employee</h2>
            <form onSubmit={handleSubmit}>
              <div className="md:grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="label"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={employee.userId?.name}
                    onChange={handleChange}
                    id="name"
                    placeholder="Insert Name"
                    className="input"
                    required
                  />
                </div>
                {/* Marital Status */}
                <div>
                  <label
                    htmlFor="maritalStatus"
                    className="label"
                  >
                    Marital Status
                  </label>
                  <select
                    name="maritalStatus"
                    onChange={handleChange}
                    value={employee.maritalStatus}
                    id="maritalStatus"
                    className="select"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                  </select>
                </div>
                {/* Designation */}
                <div>
                  <label
                    htmlFor="designation"
                    className="label"
                  >
                    Designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    onChange={handleChange}
                    value={employee.designation}
                    id="designation"
                    placeholder="Designation"
                    className="input"
                    required
                  />
                </div>

                {/* Salary */}
                <div>
                  <label
                    htmlFor="salary"
                    className="label"
                  >
                    Salary
                  </label>
                  <input
                    type="number"
                    name="salary"
                    onChange={handleChange}
                    value={employee.salary}
                    id="salary"
                    placeholder="Salary"
                    className="input"
                    required
                  />
                </div>

                {/* Department */}
                <div className="col-span-2">
                  <label
                    htmlFor="department"
                    className="label"
                  >
                    Department
                  </label>
                  <select
                    name="department"
                    onChange={handleChange}
                    value={employee.department?._id || ""}
                    id="department"
                    className="select"
                    required
                  >
                    <option value="">Select Department</option>
                    {departments?.length > 0 ? (
                      departments.map((dep) => (
                        <option key={dep._id} value={dep._id}>
                          {dep.dep_name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No department available</option>
                    )}
                  </select>
                </div>
              </div>
              <div className="mt-7 text-center">
                <Btn type="submit">Edit Employee</Btn>
              </div>
            </form>
          </>
        ) : (
          <div>Employee not found</div>
        )}
      </div>
    </Container>
  );
};

export default Edit;
