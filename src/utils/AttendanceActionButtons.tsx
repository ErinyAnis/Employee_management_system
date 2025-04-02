import axios from "axios";
import Btn from "../components/ui/Btn";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

type TStatus = "Present" | "Absent" | "Sick" | "Leave" | null;

interface Props {
  status: TStatus;
  employeeId: string;
  statusChange: () => void;
}

const AttendanceActionButtons = ({
  status,
  employeeId,
  statusChange,
}: Props) => {
  //status fn
  const markEmployee = async (newStatus: TStatus, employeeId: string) => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Change status to ${newStatus}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/attendance/update/${employeeId}`,
          { status: newStatus },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (response.data.success) {
          statusChange();
          toast.success("Status has been updated")
        }
      } catch (error) {
        console.log(error);
        toast.error("error in edit status");
      }
    }
  };

  return (
    <div>
      {status === null ? (
        <div className="flex items-center justify-center gap-x-3 lg:gap-x-4">
          <Btn
            onClick={() => markEmployee("Present", employeeId)}
            className="bg-green-600 hover:bg-green-700"
          >
            Present
          </Btn>
          <Btn
            onClick={() => markEmployee("Absent", employeeId)}
            className="bg-red-600 hover:bg-red-700"
          >
            Absent
          </Btn>
          <Btn
            onClick={() => markEmployee("Sick", employeeId)}
            className="bg-gray-500 hover:bg-gray-600"
          >
            Sick
          </Btn>
          <Btn
            onClick={() => markEmployee("Leave", employeeId)}
            className="bg-yellow-500 text-black hover:bg-yellow-600"
          >
            Leave
          </Btn>
        </div>
      ) : (
        <p className="mx-auto w-20 rounded bg-gray-100 py-2 text-center">
          {status}
        </p>
      )}
    </div>
  );
};

export default AttendanceActionButtons;
