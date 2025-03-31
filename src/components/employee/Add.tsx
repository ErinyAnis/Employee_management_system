import { useEffect, useState } from "react";
import Btn from "../ui/Btn";
import Container from "../ui/Container";
import { Department } from "../../types/Department";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchDepartments } from "../../utils/fetchDepartments";

type FormData = {
  name: string;
  email: string;
  employeeId: string;
  dob: string;
  gender: string;
  maritalStatus: string;
  designation: string;
  department: string;
  salary: string;
  password: string;
  role: string;
  image: File | null;
};

const Add = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    employeeId: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    designation: "",
    department: "",
    salary: "",
    password: "",
    role: "",
    image: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;

    if (type === "file" && files) {
      // console.log(`📂 File selected: ${files[0].name}`);
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataObj = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "image" && value instanceof File) {
        formDataObj.append("image", value); // Append file correctly
      } else {
        formDataObj.append(key, value as string);
      }
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/employee/add`,
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="mt-8 mx-5 max-w-4xl rounded-md bg-white p-8 shadow-md">
      <h2 className="mb-6 text-2xl font-bold">Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              id="name"
              placeholder="Insert Name"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 transition focus:border-gray-500"
              required
            />
          </div>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              id="email"
              placeholder="Insert Email"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 transition focus:border-gray-500"
              required
            />
          </div>
          {/* Employee ID */}
          <div>
            <label
              htmlFor="employeeId"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Employee ID
            </label>
            <input
              type="text"
              name="employeeId"
              onChange={handleChange}
              id="employeeId"
              placeholder="Emplyee ID"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 transition focus:border-gray-500"
              required
            />
          </div>
          {/* Date of birth */}
          <div>
            <label
              htmlFor="dob"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Date Of Birth
            </label>
            <input
              type="date"
              name="dob"
              onChange={handleChange}
              id="dob"
              placeholder="DOB"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 transition focus:border-gray-500"
              required
            />
          </div>
          {/* Gender */}
          <div>
            <label
              htmlFor="gender"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              name="gender"
              onChange={handleChange}
              id="gender"
              className="mt-1 block w-full cursor-pointer rounded-md border border-gray-300 p-2 transition focus:border-gray-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          {/* Marital Status */}
          <div>
            <label
              htmlFor="maritalStatus"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Marital Status
            </label>
            <select
              name="maritalStatus"
              onChange={handleChange}
              id="maritalStatus"
              className="mt-1 block w-full cursor-pointer rounded-md border border-gray-300 p-2 transition focus:border-gray-500"
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
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Designation
            </label>
            <input
              type="text"
              name="designation"
              onChange={handleChange}
              id="designation"
              placeholder="Designation"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 transition focus:border-gray-500"
              required
            />
          </div>
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
              onChange={handleChange}
              id="department"
              className="mt-1 block w-full cursor-pointer rounded-md border border-gray-300 p-2 transition focus:border-gray-500"
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

          {/* Salary */}
          <div>
            <label
              htmlFor="salary"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Salary
            </label>
            <input
              type="number"
              name="salary"
              onChange={handleChange}
              id="salary"
              placeholder="Salary"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 transition focus:border-gray-500"
              required
            />
          </div>
          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              id="password"
              placeholder="********"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 transition focus:border-gray-500"
              required
            />
          </div>
          {/* Role */}
          <div>
            <label
              htmlFor="role"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              name="role"
              onChange={handleChange}
              id="role"
              className="mt-1 block w-full cursor-pointer rounded-md border border-gray-300 p-2 transition focus:border-gray-500"
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="w-full">
            <label
              htmlFor="image"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Upload Image
            </label>
            <div className="flex w-full items-center justify-center">
              <label
                htmlFor="image"
                className="flex flex-1 cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition focus-within:ring-2 focus-within:ring-gray-500 hover:bg-gray-100"
              >
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  id="image"
                  accept="image/*"
                  className=""
                  required
                />
              </label>
            </div>
          </div>
        </div>
        <div className="mt-7 text-center">
          <Btn type="submit" className="px-8">Add Employee</Btn>
        </div>
      </form>
    </Container>
  );
};

export default Add;
