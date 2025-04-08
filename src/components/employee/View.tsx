import { useParams } from "react-router-dom";
import Container from "../ui/Container";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Employee } from "../../types/Employee";

const View = () => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <Container>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {/* img */}
          <div className="mx-auto max-w-3xl rounded-md bg-white p-8 shadow-md lg:mt-10">
            <h2 className="mb-8 text-center text-2xl font-bold">
              Employee Details
            </h2>
            <div className="grid items-center gap-5 rounded md:grid-cols-2 lg:gap-8">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${employee?.userId?.profileImage}`}
                alt={employee?.userId?.name}
                className="h-[230px] object-cover object-top max-md:mx-auto max-md:w-[300px] md:h-[400px] md:w-full"
              />

              <div className="max-md:mx-auto">
                <div className="mb-5 flex items-center space-x-2 lg:space-x-3">
                  <p className="text-base font-bold lg:text-lg">Name:</p>
                  <p className="font-medium max-md:text-sm">
                    {employee?.userId?.name}
                  </p>
                </div>
                <div className="mb-5 flex items-center space-x-2 lg:space-x-3">
                  <p className="text-base font-bold lg:text-lg">Employee ID:</p>
                  <p className="font-medium max-md:text-sm">
                    {employee?.employeeId}
                  </p>
                </div>
                <div className="mb-5 flex items-center space-x-2 lg:space-x-3">
                  <p className="text-base font-bold lg:text-lg">
                    Date of Birth:
                  </p>
                  <p className="font-medium max-md:text-sm">
                    {employee?.dob
                      ? new Date(employee?.dob).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
                <div className="mb-5 flex items-center space-x-2 lg:space-x-3">
                  <p className="text-base font-bold lg:text-lg">Gender:</p>
                  <p className="font-medium max-md:text-sm">
                    {employee?.gender}
                  </p>
                </div>
                <div className="mb-5 flex items-center space-x-2 lg:space-x-3">
                  <p className="text-base font-bold lg:text-lg">Department:</p>
                  <p className="font-medium max-md:text-sm">
                    {employee?.department.dep_name}
                  </p>
                </div>
                <div className="mb-5 flex items-center space-x-2 lg:space-x-3">
                  <p className="text-base font-bold lg:text-lg">
                    Marital Status:
                  </p>
                  <p className="font-medium max-md:text-sm">
                    {employee?.maritalStatus}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default View;
