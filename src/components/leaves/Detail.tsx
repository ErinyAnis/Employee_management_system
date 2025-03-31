import { useNavigate, useParams } from "react-router-dom";
import Container from "../ui/Container";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Leave } from "../../types/Leave";
import Btn from "../ui/Btn";

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const [leave, setLeave] = useState<Leave | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong in fetching employee");
      } finally {
        setLoading(false);
      }
    };
    fetchLeave();
  }, [id]);

  const changeStatus = async (
    id: string,
    status: "Pending" | "Approved" | "Rejected",
  ) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/leave/${id}`,
        {status},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response.data.success) {
        navigate("/admin-dashboard/leaves")
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in fetching employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {loading ? (
        <div>Loading...</div>
      ) : leave ? (
        <>
          {/* img */}
          <div className="mx-auto mt-2 max-w-3xl rounded-md bg-white p-8 shadow-md lg:mt-10">
            <h2 className="mb-8 text-center text-2xl font-bold">
              Leave Details
            </h2>
            <div className="grid items-center gap-5 rounded md:grid-cols-2 lg:gap-8">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${leave?.employeeId?.userId?.profileImage}`}
                alt={leave?.employeeId?.userId?.name}
                className="h-[300px] object-cover object-top max-md:mx-auto max-md:w-[300px] md:h-[400px] md:w-full"
              />

              <div className="max-md:mx-auto">
                <div className="mb-5 flex items-center space-x-2 lg:space-x-3">
                  <p className="text-base font-bold lg:text-lg">Name:</p>
                  <p className="font-medium max-md:text-sm">
                    {leave?.employeeId?.userId?.name}
                  </p>
                </div>

                <div className="mb-5 flex items-center space-x-2 lg:space-x-3">
                  <p className="text-base font-bold lg:text-lg">Employee ID:</p>
                  <p className="font-medium max-md:text-sm">
                    {leave?.employeeId?.employeeId}
                  </p>
                </div>

                <div className="mb-5 flex items-center space-x-2 lg:space-x-3">
                  <p className="text-base font-bold lg:text-lg">Leave Type:</p>
                  <p className="font-medium max-md:text-sm">
                    {leave?.leaveType}
                  </p>
                </div>

                <div className="mb-5 flex items-center space-x-2 lg:space-x-3">
                  <p className="text-base font-bold lg:text-lg">Reason:</p>
                  <p className="font-medium max-md:text-sm">{leave?.reason}</p>
                </div>

                <div className="mb-5 flex items-center space-x-2 lg:space-x-3">
                  <p className="text-base font-bold lg:text-lg">Department:</p>
                  <p className="font-medium max-md:text-sm">
                    {leave?.employeeId?.department.dep_name}
                  </p>
                </div>

                <div className="mb-5 flex items-center space-x-2 lg:space-x-3">
                  <p className="text-base font-bold lg:text-lg">Start Date:</p>
                  <p className="font-medium max-md:text-sm">
                    {new Date(leave?.startDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="mb-5 flex items-center space-x-2 lg:space-x-3">
                  <p className="text-base font-bold lg:text-lg">End Date:</p>
                  <p className="font-medium max-md:text-sm">
                    {new Date(leave?.endDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="mb-5 flex items-center space-x-2 lg:space-x-3">
                  <p className="text-base font-bold lg:text-lg">
                    {leave.status === "Pending" ? "Action" : "Status"}:
                  </p>
                  {leave.status === "Pending" ? (
                    <div className="flex gap-x-2 lg:gap-x-3">
                      <Btn
                        className="bg-teal-500 hover:bg-teal-600"
                        onClick={() => changeStatus(leave._id, "Approved")}
                      >
                        Approve
                      </Btn>
                      <Btn
                        className="bg-red-500/80 hover:bg-red-600"
                        onClick={() => changeStatus(leave._id, "Rejected")}
                      >
                        Reject
                      </Btn>
                    </div>
                  ) : (
                    <p className="ffont-medium max-md:text-sm">
                      {leave?.status}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>No Leaves</div>
      )}
    </Container>
  );
};

export default Detail;
