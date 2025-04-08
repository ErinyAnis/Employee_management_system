import { useState } from "react";
import Btn from "../ui/Btn";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import Container from "../ui/Container";
import { departmentSchema, TDepartmentSchema } from "../../../lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const AddDepartment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TDepartmentSchema>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      dep_name: "",
      description: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data: TDepartmentSchema) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/department/add`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.data.success) {
        toast.success("Department added successfully");
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
        <div className="mx-auto mt-10 max-w-96 rounded-md bg-white p-8 shadow-md lg:max-w-[500px]">
          <h2 className="mb-6 text-lg font-bold lg:text-2xl">
            Add New Department
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <label htmlFor="dep_name" className="label">
                Department Name
              </label>
              <input
                type="text"
                placeholder="Enter Dep Name"
                id="dep_name"
                className="input"
                {...register("dep_name")}
              />
              {errors.dep_name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.dep_name.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="description" className="label">
                Description
              </label>
              <textarea
                placeholder="Description"
                className="textArea"
                id="description"
                rows={4}
                {...register("description")}
              ></textarea>
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
            <Btn className="mt-6 w-full" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Department"}
            </Btn>
          </form>
        </div>
      )}
    </Container>
  );
};

export default AddDepartment;
