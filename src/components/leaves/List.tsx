import { useEffect, useState } from "react";
import ListHeading from "../shared/ListHeading";
import Container from "../ui/Container";
import axios from "axios";
import { toast } from "react-toastify";
import { Leave } from "../../types/Leave";
import { useParams } from "react-router-dom";


const List = () => {
  const [leaves, setleaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();


  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/leave/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.data.success) {
        setleaves(response.data.leaves);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error in getting leaves");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [id]);

  let sno = 1;

  return (
    <Container>
      <ListHeading
        title="Manage Leaves"
        addTitle="Add New Leave"
        addURL="/employee-dashboard/leaves/add-leave"
        inputPlaceholder="Search By Status"
        LeaveDiableBtnForAdmin
      />

      <div className="mt-4">
        {loading ? (
          <div>Loading...</div>
        ) : leaves.length > 0 ? (
          <div className="mx-auto max-w-[80vw] overflow-x-auto sm:max-w-[86vw] md:max-w-[90vw] lg:max-w-[100vw] xl:max-w-[100vw]">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="border border-gray-200 bg-gray-50 text-xs text-gray-700 uppercase">
                <tr>
                  <th className="px-6 py-3">SNO</th>
                  <th className="px-6 py-3">Leave Type</th>
                  <th className="px-6 py-3">From</th>
                  <th className="px-6 py-3">To</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave: Leave) => (
                  <tr
                    key={leave._id}
                    className="border-b bg-white dark:border-gray-800 dark:bg-gray-700"
                  >
                    <td className="px-6 py-3">{sno++}</td>
                    <td className="px-6 py-3">{leave.leaveType}</td>
                    <td className="px-6 py-3">
                      {new Date(leave.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">
                      {new Date(leave.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">{leave.reason}</td>
                    <td className="px-6 py-3">{leave.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No Records</div>
        )}
      </div>
    </Container>
  );
};

export default List;
