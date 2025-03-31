import {
  FaBuilding,
  FaFileAlt,
  FaHourglassHalf,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";
import SummaryCard from "../ui/SummaryCard";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import Container from "../ui/Container";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

type Tsummary = {
  totalDepartments: number;
  totalEmployees: number;
  totalSalary: number;
  leaveSummary: {
    appliedFor: number;
    approved: number;
    pending: number;
    rejected: number;
  };
};

const AdminSummary = () => {
  const [summary, setSummary] = useState<Tsummary | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/dashboard/summary`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        setSummary(response.data);
      } catch (error) {
        console.log(error);
        toast.error("error in getting summary");
      }
    };

    fetchSummary();
  }, []);

  if (!summary) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <h3 className="text-2xl font-bold">Dashboard overview</h3>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <SummaryCard
          icon={FaUsers}
          text="Total Employees"
          number={summary.totalEmployees}
          color="bg-teal-600"
        />
        <SummaryCard
          icon={FaBuilding}
          text="Total Departments"
          number={summary.totalDepartments}
          color="bg-yellow-600"
        />
        <SummaryCard
          icon={FaMoneyBill1Wave}
          text="Monthly Salary"
          number={summary.totalSalary}
          color="bg-red-600"
        />
      </div>

      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold">Leave Details</h4>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <SummaryCard
            icon={FaFileAlt}
            text="Leave Applied"
            number={summary.leaveSummary.appliedFor}
            color="bg-teal-600"
          />
          <SummaryCard
            icon={FaMoneyBill1Wave}
            text="Leave Approved"
            number={summary.leaveSummary.approved}
            color="bg-green-600"
          />
          <SummaryCard
            icon={FaHourglassHalf}
            text="Leave Pending"
            number={summary.leaveSummary.pending}
            color="bg-yellow-600"
          />
          <SummaryCard
            icon={FaTimesCircle}
            text="Leave Rejected"
            number={summary.leaveSummary.rejected}
            color="bg-red-600"
          />
        </div>
      </div>
    </Container>
  );
};

export default AdminSummary;
