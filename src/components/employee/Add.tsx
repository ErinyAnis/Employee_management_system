import { useEffect, useState } from "react";
import Btn from "../ui/Btn";
import Container from "../ui/Container";
import { Department } from "../../types/Department";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchDepartments } from "../../utils/fetchDepartments";
import { employeeSchema, TEmployeeSchema } from "../../../lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

// type FormData = {
//   name: string;
//   email: string;
//   employeeId: string;
//   dob: string;
//   gender: string;
//   maritalStatus: string;
//   designation: string;
//   department: string;
//   salary: string;
//   password: string;
//   role: string;
//   image: File | null;
// };

const Add = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<TEmployeeSchema>({
    resolver: zodResolver(employeeSchema),
  });

  const [departments, setDepartments] = useState<Department[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    fetchData();
  }, []);

  // Custom register for file input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setValue("image", e.target.files[0]);
    }
  };

  const onSubmit = async (data: TEmployeeSchema) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "image" && value instanceof File) {
        formData.append("image", value);
      } else {
        formData.append(key, value as string);
      }
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/employee/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.success) {
        toast.success("Employee added successfully")
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="mx-5 mt-8 max-w-4xl rounded-md bg-white p-8 shadow-md">
      <h2 className="mb-6 text-2xl font-bold">Add New Employee</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Name */}
          <div>
            <label htmlFor="name" className="label">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Insert Name"
              className="input"
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              placeholder="Insert Email"
              className="input"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Employee ID */}
          <div>
            <label htmlFor="employeeId" className="label">
              Employee ID
            </label>
            <input
              {...register("employeeId")}
              type="text"
              id="employeeId"
              placeholder="Emplyee ID"
              className="input"
            />
            {errors.employeeId && (
              <p className="mt-1 text-sm text-red-500">
                {errors.employeeId.message}
              </p>
            )}
          </div>

          {/* Date of birth */}
          <div>
            <label htmlFor="dob" className="label">
              Date Of Birth
            </label>
            <input
              {...register("dob")}
              type="date"
              id="dob"
              placeholder="DOB"
              className="input"
            />
            {errors.dob && (
              <p className="mt-1 text-sm text-red-500">{errors.dob.message}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="label">
              Gender
            </label>
            <select {...register("gender")} id="gender" className="select">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-500">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* Marital Status */}
          <div>
            <label htmlFor="maritalStatus" className="label">
              Marital Status
            </label>
            <select
              {...register("maritalStatus")}
              id="maritalStatus"
              className="select"
            >
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
            {errors.maritalStatus && (
              <p className="mt-1 text-sm text-red-500">
                {errors.maritalStatus.message}
              </p>
            )}
          </div>

          {/* Designation */}
          <div>
            <label htmlFor="designation" className="label">
              Designation
            </label>
            <input
              {...register("designation")}
              type="text"
              id="designation"
              placeholder="Designation"
              className="input"
            />
            {errors.designation && (
              <p className="mt-1 text-sm text-red-500">
                {errors.designation.message}
              </p>
            )}
          </div>

          {/* Department */}
          <div>
            <label htmlFor="department" className="label">
              Department
            </label>
            <select
              {...register("department")}
              id="department"
              className="select"
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
            {errors.department && (
              <p className="mt-1 text-sm text-red-500">
                {errors.department.message}
              </p>
            )}
          </div>

          {/* Salary */}
          <div>
            <label htmlFor="salary" className="label">
              Salary
            </label>
            <input
              {...register("salary")}
              type="number"
              id="salary"
              placeholder="Salary"
              className="input"
            />
            {errors.salary && (
              <p className="mt-1 text-sm text-red-500">
                {errors.salary.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              placeholder="********"
              className="input"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="label">
              Role
            </label>
            <select {...register("role")} id="role" className="select">
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div className="w-full">
            <label htmlFor="image" className="label">
              Upload Image
            </label>

            <input
              type="file"
              id="image"
              accept="image/*"
              className="input cursor-pointer"
              onChange={handleImageChange}
            />
            {errors.image && (
              <p className="mt-1 text-sm text-red-500">
                {errors.image.message}
              </p>
            )}
          </div>
        </div>
        <div className="mt-7 text-center">
          <Btn
            type="submit"
            className="px-8"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Employee"}
          </Btn>
        </div>
      </form>
    </Container>
  );
};

export default Add;
