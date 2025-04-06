
import Btn from "../ui/Btn";
import Container from "../ui/Container";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { leaveSchema, TLeaveSchema } from "../../../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";

const Add = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLeaveSchema>({
    resolver: zodResolver(leaveSchema),
  });

  const onSubmit = async (data: TLeaveSchema) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/leave/add`,
        {
          userId: user?._id,
          ...data,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      if (response.data.success) {
        toast.success("Leave request submitted successfully");
        navigate(`/employee-dashboard/leaves/${user?._id}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error submitting leave request");
    }
  };

  return (
    <Container className="m-5 rounded-md bg-white p-8 shadow-md lg:m-10">
      <h2 className="mb-6 text-lg font-bold lg:text-2xl">Leave Request</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 lg:mb-5">
          <div>
            <label htmlFor="LeaveType" className="label">
              Leave Type
            </label>
          </div>
          <select
            id="LeaveType"
            className="select"
            defaultValue=""
            {...register("leaveType")}
          >
            <option value="" disabled>
              Select Department
            </option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Annual Leave">Annual Leave</option>
          </select>
          {errors.leaveType && (
            <p className="mt-1 text-sm text-red-500">
              {errors.leaveType.message}
            </p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* form date */}
          <div>
            <label htmlFor="startDate" className="label">
              Form Date
            </label>
            <input
              type="date"
              id="startDate"
              className="input"
              {...register("startDate")}
            />
            {errors.startDate && (
              <p className="mt-1 text-sm text-red-500">
                {errors.startDate.message}
              </p>
            )}
          </div>

          {/* to date */}
          <div>
            <label htmlFor="endDate" className="label">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              className="input"
              {...register("endDate")}
            />
            {errors.endDate && (
              <p className="mt-1 text-sm text-red-500">
                {errors.endDate.message}
              </p>
            )}
          </div>
        </div>
        {/* descrition */}
        <div className="mt-4">
          <label htmlFor="reason" className="label">
            Description
          </label>
          <textarea
            id="reason"
            placeholder="Reason"
            className="textArea"
            {...register("reason")}
          ></textarea>
          {errors.reason && (
            <p className="mt-1 text-sm text-red-500">{errors.reason.message}</p>
          )}
        </div>

        <div className="mt-8 text-center">
          <Btn className="px-8 py-2.5" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Add Leave Request"}
          </Btn>
        </div>
      </form>
    </Container>
  );
};

export default Add;
