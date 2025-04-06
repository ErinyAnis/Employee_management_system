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
import { salarySchema, TSalarySchema } from "../../../lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const AddSalary = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]); //List of employees in selected department
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TSalarySchema>({
    resolver: zodResolver(salarySchema),
    mode: "onBlur",
  });

  const selectedDepartment = watch("departmentId");

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

  // Fetch employees when department changes
  useEffect(() => {
    const fetchEmployeesByDepartment = async () => {
      if (!selectedDepartment) return;

      try {
        const emps = await fetchEmployees(selectedDepartment);
        setEmployees(emps || []);
        // Reset employee selection when department changes
        setValue("employeeId", "");
      } catch (error) {
        console.log(error);
        setEmployees([]);
        toast.error("Failed to fetch employees");
      }
    };

    fetchEmployeesByDepartment();
  }, [selectedDepartment, setValue]);

  const onSubmit = async (data: TSalarySchema) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/salary/add`,
        data,
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
    <Container className="mx-3 mt-5 rounded-md bg-white p-8 shadow-md lg:mx-5">
      <h2 className="mb-6 text-2xl font-bold">Add Salary</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Department */}
            <div>
              <label htmlFor="department" className="label">
                Department
              </label>
              <select
                {...register("departmentId")}
                id="department"
                className="select"
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
              {errors.departmentId && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.departmentId.message}
                </p>
              )}
            </div>

            {/* Employee */}
            <div>
              <label htmlFor="employee" className="label">
                Employee
              </label>
              <select
                {...register("employeeId")}
                id="employee"
                className="select"
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
              {errors.employeeId && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.employeeId.message}
                </p>
              )}
            </div>

            {/* Basic Salary */}
            <div>
              <label htmlFor="basicSalary" className="label">
                Basic Salary
              </label>
              <input
                type="number"
                id="basicSalary"
                placeholder="Basic Salary"
                className="input"
                {...register("basicSalary", {
                  valueAsNumber: true,
                })}
              />
              {errors.basicSalary && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.basicSalary.message}
                </p>
              )}
            </div>

            {/* Allowances */}
            <div>
              <label htmlFor="allowances" className="label">
                Allowances
              </label>
              <input
                type="number"
                id="allowances"
                placeholder="Allowances"
                className="input"
                {...register("allowances", {
                  valueAsNumber: true,
                })}
              />
              {errors.allowances && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.allowances.message}
                </p>
              )}
            </div>

            {/* Deductions */}
            <div>
              <label htmlFor="deductions" className="label">
                Deductions
              </label>
              <input
                type="number"
                id="deductions"
                placeholder="Deductions"
                className="input"
                {...register("deductions", {
                  valueAsNumber: true,
                })}
              />
              {errors.deductions && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.deductions.message}
                </p>
              )}
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
                id="payDate"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 transition focus:border-gray-500"
                {...register("payDate")}
              />
              {errors.payDate && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.payDate.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-7 text-center">
            <Btn type="submit" className="px-7" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Salary"}
            </Btn>
          </div>
        </form>
      )}
    </Container>
  );
};

export default AddSalary;
