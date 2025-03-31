import { useEffect, useState } from "react";
import Btn from "../ui/Btn";
import Container from "../ui/Container";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Employee } from "../../types/Employee";
import { fetchDepartments } from "../../utils/fetchDepartments";
import { Department } from "../../types/Department";
import { fetchEmployees } from "../../utils/fetchEmployees";
import { Salary } from "../../types/Salary";



const AddSalary = () => {
  const navigate = useNavigate();
  const [salary, setSalary] = useState<Salary>({
    employeeId: "",
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: "",
  });
  const [departments, setDepartments] = useState<Department[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]); //List of employees in selected department
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [loading, setLoading] = useState(false);

  // Get departments on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const departments = await fetchDepartments();
        setDepartments(departments || []);
      } catch (error) {
        toast.error("Failed to fetch departments");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDepartmentChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const departmentId = e.target.value;
    setSelectedDepartment(departmentId);

    // Preserve current salary data
    const currentSalaryData = { ...salary };

    try {
      const emps = await fetchEmployees(departmentId);
      if (emps.length < 0) {
        setEmployees([]);
      } else {
        setEmployees(emps);
      }

      // Restore salary data after department change
      setSalary(currentSalaryData);
    } catch (error) {
      console.log(error);
      setEmployees([]);
      toast.error("Failed to fetch employees");
    }
  };

  const handleEmployeeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const employeeId = e.target.value;
    const selected = employees.find((emp) => emp._id === employeeId) || null;
    setSalary((prev) => ({
      ...prev,
      employeeId,
      basicSalary: selected?.salary || 0,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSalary((prev) => ({
      ...prev,
      [name]: name === "payDate" ? value: value === "" ? 0  : Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/salary/add`,
        salary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.success) {
        toast.success("Salary added successfully");
        navigate("/admin-dashboard/employees");
      } else {
        toast.error(response.data.message || "Failed to add salary");
      }
    } catch (error) {
      console.error("Error adding salary:", error);
      toast.error("Something went wrong while adding salary");
    }
  };

  return (
    <Container className="mt-5 rounded-md bg-white p-8 shadow-md mx-3 lg:mx-5">
      <h2 className="mb-6 text-2xl font-bold">Add Salary</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Department */}
            <div>
              <label
                htmlFor="department"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Department
              </label>
              <select
                name="department"
                onChange={handleDepartmentChange}
                value={selectedDepartment}
                id="department"
                className="mt-1 block w-full cursor-pointer rounded-md border border-gray-300 p-2 transition focus:border-gray-500"
                required
              >
                <option value="" disabled>
                  Select Department
                </option>
                {departments.map((dep) => (
                  <option key={dep._id} value={dep._id}>
                    {dep.dep_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Employee */}
            <div>
              <label
                htmlFor="employee"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Employee
              </label>
              <select
                name="employeeId"
                onChange={handleEmployeeSelect}
                value={salary.employeeId}
                id="employee"
                className="mt-1 block w-full cursor-pointer rounded-md border border-gray-300 p-2 transition focus:border-gray-500"
                required
                disabled={!employees.length}
              >
                <option value="" disabled>
                  {employees.length > 0
                    ? "Select Employee"
                    : "No employee in this department"}
                </option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.userId.name} ({emp.employeeId})
                  </option>
                ))}
              </select>
            </div>

            {/* Basic Salary */}
            <div>
              <label
                htmlFor="basicSalary"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Basic Salary
              </label>
              <input
                type="number"
                name="basicSalary"
                value={salary.basicSalary? salary.basicSalary: ""}
                onChange={handleChange}
                id="basicSalary"
                placeholder="basicSalary"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 transition focus:border-gray-500"
                required
                min="0"
              />
            </div>

            {/* Allowances */}
            <div>
              <label
                htmlFor="allowances"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Allowances
              </label>
              <input
                type="number"
                name="allowances"
                value={salary.allowances}
                onChange={handleChange}
                id="allowances"
                placeholder="allowances"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 transition focus:border-gray-500"
                required
              />
            </div>

            {/* Deductions */}
            <div>
              <label
                htmlFor="deductions"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Deductions
              </label>
              <input
                type="number"
                name="deductions"
                value={salary.deductions}
                onChange={handleChange}
                id="deductions"
                placeholder="deductions"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 transition focus:border-gray-500"
                required
                min="0"
              />
            </div>

            {/* Pay date */}
            <div>
              <label
                htmlFor="payDate"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Pay Date
              </label>
              <input
                type="date"
                name="payDate"
                value={salary.payDate}
                onChange={handleChange}
                id="payDate"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 transition focus:border-gray-500"
                required
              />
            </div>
          </div>

          <div className="mt-7 text-center">
            <Btn type="submit" className="px-7">Add Salary</Btn>
          </div>
        </form>
      )}
    </Container>
  );
};

export default AddSalary;
