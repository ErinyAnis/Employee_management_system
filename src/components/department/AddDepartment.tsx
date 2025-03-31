import { useState } from "react";
import Btn from "../ui/Btn";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import Container from "../ui/Container";

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/department/add`,
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      const err = error as AxiosError<{ success: boolean; error: string }>;
      if (err.response && !err.response.data.success) {
        toast.error(err.response.data.error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="mx-auto mt-10 w-96 max-w-3xl rounded-md bg-white p-8 shadow-md">
          <h2 className="mb-6 text-2xl font-bold">Add New Department</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="dep_name" className="label">
                Department Name
              </label>
              <input
                onChange={handleChange}
                type="text"
                placeholder="Enter Dep Name"
                name="dep_name"
                id="dep_name"
                className="input"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="label">
                Description
              </label>
              <textarea
                onChange={handleChange}
                name="description"
                placeholder="Description"
                className="textArea"
                id="description"
                rows={4}
              ></textarea>
            </div>
            <Btn className="mt-6 w-full">Add Department</Btn>
          </form>
        </div>
      )}
    </Container>
  );
};

export default AddDepartment;
