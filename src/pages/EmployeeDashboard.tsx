import { Outlet } from "react-router-dom";
import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/EmployeeDashboard/Sidebar";

const EmployeeDashboard = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-gray-100">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default EmployeeDashboard;
