import { useNavigate } from "react-router-dom";
import Btn from "./Btn";


export const LeaveButtons = ({ Id }: { Id: string }) => {
    const navigate = useNavigate();

    const handleView = (id: string) => {
      navigate(`/admin-dashboard/leaves/${id}`);
    };

    return <Btn onClick={() => handleView(Id)}>View</Btn>;
  };