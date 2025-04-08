import { useEffect, useState } from "react";
import Container from "../ui/Container";
import axios from "axios";
import { toast } from "react-toastify";

type TEmployeeAttendance = {
  departmentName: string;
  employeeId: string;
  employeeName: string;
  status: "Present" | "Absent" | "Sick" | "Leave";
};

type AttendanceReport = {
  [date: string]: TEmployeeAttendance[];
};

const AttendanceReport = () => {
  const [report, setReport] = useState<AttendanceReport>({});
  const [skip, setSkip] = useState(0);
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const limit = 5;

  const fetchReport = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      query.append("limit", limit.toString());
      query.append("skip", skip.toString());
      if (dateFilter) {
        query.append("date", dateFilter);
      }
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/attendance/report?${query.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response.data.success) {
        if (skip === 0) {
          setReport(response.data.groupData);
        } else {
          setReport((prevData) => {
            const mergedData = { ...prevData };

            for (const date in response.data.groupData) {
              const existingRecords = mergedData[date] || [];
              const newRecords = response.data.groupData[date];
              mergedData[date] = [...existingRecords, ...newRecords];
            }

            return mergedData;
          });
        }
      }
      setHasMore(Object.keys(response.data.groupData).length > 0);
    } catch (error) {
      console.log(error);
      toast.error("Error in getting attendance report");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [skip, dateFilter, limit]);

  const handleLoadMore = () => {
    setSkip((prevSkip) => prevSkip + limit);
  };

  return (
    <Container>
      <div className="bg-white p-5 lg:p-10">
        <h2 className="text-center text-lg font-bold lg:text-2xl">
          Attendance Report
        </h2>
        <div className="mt-7 mb-5 flex flex-wrap items-center gap-4">
          <h3 className="text-xl font-semibold">Filter by Date</h3>
          <input
            type="date"
            className="input max-w-44"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDateFilter(e.target.value);
              setSkip(0);
            }}
          />
        </div>

        {!loading && Object.keys(report).length === 0 && (
          <div className="mt-3 text-center">No attendance records found</div>
        )}

        {/* to extract the array from objects */}
        {loading ? (
          <div className="mt-3">Loading...</div>
        ) : (
          Object.entries(report).map(([date, record]) => {
            return (
              <div key={date} className="my-3 border-b pb-3 overflow-x-auto  max-sm:max-w-[70vw] max-md:max-w-[75vw]">
                <h4 className="mb-3 text-xl font-semibold">{date}</h4>
                <table
                  className=" text-center max-md:min-w-[600px] md:w-full overflow-x-auto"
                  border={1}
                  cellPadding={10}
                >
                  <thead className="h-11">
                    <tr>
                      <th>S No</th>
                      <th>Employee ID</th>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {record.map((data, i) => (
                      <tr key={`${date}-${data.employeeId}-${i}`}>
                        <td>{i + 1}</td>
                        <td>{data.employeeId}</td>
                        <td>{data.employeeName}</td>
                        <td>{data.departmentName}</td>
                        <td>{data.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })
        )}
        <button
          onClick={handleLoadMore}
          disabled={!hasMore || loading}
          className="mt-3 cursor-pointer rounded bg-gray-100 px-6 py-2 text-lg font-semibold text-gray-600 transition hover:bg-gray-200"
        >
          {loading ? "Loading..." : hasMore ? "Load More" : "No More Records"}
        </button>
      </div>
    </Container>
  );
};

export default AttendanceReport;
