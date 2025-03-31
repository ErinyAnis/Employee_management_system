import { useState } from "react";
import Btn from "../ui/Btn";
import Container from "../ui/Container";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [leave, setLeave] = useState({
    userId: user?._id,
  });
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setLeave((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/leave/add`,
        leave,
        {
          headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
        },
      );
      if (response.data.success) {
        navigate("/employee-dashboard/leaves");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding leave");
    }
  };

  return (
    <Container className="m-5 rounded-md bg-white p-8 shadow-md lg:m-10">
      <h2 className="mb-6 text-lg font-bold lg:text-2xl">Leave Request</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 lg:mb-5">
          <div>
            <label htmlFor="LeaveType" className="label">
              Leave Type
            </label>
          </div>
          <select
            name="leaveType"
            id="LeaveType"
            onChange={handleChange}
            className="select"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Select Department
            </option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Annual Leave">Annual Leave</option>
          </select>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* form date */}
          <div>
            <label htmlFor="startDate" className="label">
              Form Date
            </label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          {/* to date */}
          <div>
            <label htmlFor="endDate" className="label">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              onChange={handleChange}
              className="input"
              required
            />
          </div>
        </div>
        {/* descrition */}
        <div className="mt-4">
          <label htmlFor="reason" className="label">
            Description
          </label>
          <textarea
            name="reason"
            id="reason"
            placeholder="Reason"
            onChange={handleChange}
            className="textArea"
          ></textarea>
        </div>

        <div className="mt-8 text-center">
          <Btn className="px-8 py-2.5" type="submit">
            Add Leave Request
          </Btn>
        </div>
      </form>
    </Container>
  );
};

export default Add;
