import { useNavigate, useParams } from "react-router-dom";
import Container from "../ui/Container";
import { useEffect, useState } from "react";
import axios from "axios";
import Btn from "../ui/Btn";
import { toast } from "react-toastify";

const EditDepartment = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (response.data.success) {
          setDepartment(response.data.department);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDepartments();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/department/${id}`,
        department,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );

      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error("Error in editing department", error);
    }
  };

  return (
    <Container>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="mx-auto mt-10 w-96 max-w-3xl rounded-md bg-white p-8 shadow-md">
          <h2 className="mb-6 text-2xl font-bold">Edit Department</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="dep_name" className="label">
                Department Name
              </label>
              <input
                onChange={handleChange}
                value={department?.dep_name}
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
                value={department?.description}
                name="description"
                placeholder="Description"
                className="textArea"
                id="description"
                rows={4}
              ></textarea>
            </div>
            <Btn className="mt-6 w-full">Edit Department</Btn>
          </form>
        </div>
      )}
    </Container>
  );
};

export default EditDepartment;
