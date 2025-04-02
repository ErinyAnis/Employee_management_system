import { ReactNode, useEffect, useState } from "react";
import ListHeading from "../shared/ListHeading";
import Container from "../ui/Container";
import axios from "axios";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import { columns } from "../../utils/AttendanceHelper";
import AttendanceActionButtons from "../../utils/AttendanceActionButtons";

type Tattendance = {
  employeeId: {
    employeeId: string;
    department: { dep_name: string };
    userId: { name: string };
  };
  status: "Present" | "Absent" | "Sick" | "Leave" | null;
};

export type TattendaceData = {
  employeeId: string;
  sno: number;
  department: string;
  name: string;
  action: ReactNode;
};

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredAttendance, setFilteredAttendance] = useState([]);

  const statusChange=()=> {
    fetchAttendance()
  }

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/attendance`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.data.success) {
        let sno = 1;
        const data = response.data.attendance.map((att: Tattendance) => ({
          employeeId: att.employeeId?.employeeId || "N/A",
          sno: sno++,
          department: att.employeeId?.department?.dep_name || "N/A",
          name: att.employeeId?.userId?.name || "N/A",
          action: (
            <AttendanceActionButtons
              status={att.status}
              employeeId={att.employeeId.employeeId}
              statusChange={statusChange}
            />
          ),
        }));
        setAttendance(data);
        setFilteredAttendance(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in getting attendance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    const records = attendance.filter(
      (item: TattendaceData) =>
        item.name.toLowerCase().includes(searchTerm) || // Check name
        item.employeeId.toLowerCase().includes(searchTerm), // Check employeeId
    );
    setFilteredAttendance(records);
  };

  if (!filteredAttendance) {
    return <div>No Result</div>;
  }

  return (
    <Container>
      <ListHeading
        title="Manage Attendance"
        addTitle="Attendance Report"
        addURL="/admin-dashboard/attendance-report"
        inputPlaceholder="Search by name or ID"
        attendance
        functionProp={handleFilter}
      />
      <div className="mt-6">
        {loading ? (
          <div>Loading...</div>
        ) : filteredAttendance.length > 0 ? (
          <div className="mx-auto max-w-[80vw] overflow-x-auto sm:max-w-[86vw] md:max-w-[88vw] lg:max-w-[75vw] xl:max-w-[100vw]">
            <DataTable
              columns={columns}
              data={filteredAttendance}
              pagination
              className="h-full w-full text-center"
              responsive
            />
          </div>
        ) : (
          <div>No Records</div>
        )}
      </div>
    </Container>
  );
};

export default Attendance;
