import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Btn from "../ui/Btn";
import Swal from "sweetalert2";

interface IProps {
  _id: string;
  onDepartmentDelete?: (_id: string) => void;
}
const DepartmentButtons = ({ _id, onDepartmentDelete }: IProps) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/department/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (response.data.success) {
          onDepartmentDelete?.(_id);
          Swal.fire("Deleted!", "The department has been deleted.", "success");
        }
      } catch (error) {
        console.log(error);
        toast("Error in deleting department");
      }
    }
  };

  return (
    <div className="flex flex-1 items-center gap-3 justify-center min-w-[100px]">
      <Btn onClick={() => navigate(`/admin-dashboard/departments/${_id}`)}>
        Edit
      </Btn>
      <Btn
        onClick={() => handleDelete()}
        className="bg-red-700 hover:bg-red-800"
      >
        Delete
      </Btn>
    </div>
  );
};

export default DepartmentButtons;
