import { useEffect, useState } from "react";
import ListHeading from "../shared/ListHeading";
import Container from "../ui/Container";
import axios from "axios";
import { toast } from "react-toastify";
import { LeaveButtons } from "../ui/LeaveBtns";
import DataTable from "react-data-table-component";
import { columns } from "../../utils/LeaveHelper";
import { Leave } from "../../types/Leave";
import { LeaveRow } from "../../utils/LeaveHelper";

const Table = () => {
  const [leaves, setLeaves] = useState<LeaveRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredLeaves, setFilteredLeaves] = useState<LeaveRow[]>([]);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/leave`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave: Leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId?.employeeId,
          name: leave.employeeId?.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId?.department.dep_name,
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(),
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));
        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while getting leaves");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    const data = leaves.filter((leave) =>
      leave.employeeId.toLowerCase().includes(searchValue),
    );
    setFilteredLeaves(data);
  };

  const filterByButton = (status: "Pending" | "Approved" | "Rejected") => {
    const data = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(status.toLowerCase()),
    );
    setFilteredLeaves(data);
  };

  return (
    <Container>
      <ListHeading
        title="Manage Leaves"
        addTitle="Add New Leave"
        addURL="/employee-dashboard/leaves/add-leave"
        inputPlaceholder="Search By Emp ID"
        functionProp={filterByInput}
        leave
        filterByButton={filterByButton}
      />
      <div className="mx-auto mt-5 max-w-[80vw] overflow-x-auto sm:max-w-[86vw] md:max-w-[88vw] lg:max-w-[75vw] xl:max-w-[80vw]">
        <div className="w-full">
          {loading ? (
            <div>Loading...</div>
          ) : filteredLeaves.length > 0 ? (
            <DataTable
              columns={columns}
              data={filteredLeaves}
              pagination
              className="w-full"
            />
          ) : (
            <div>No Records</div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Table;
