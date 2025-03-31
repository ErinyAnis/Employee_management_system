import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/dashboard/AdminSidebar";
// import AdminSummary from "../components/dashboard/AdminSummary";
import Navbar from "../components/dashboard/Navbar";
// import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  // const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 bg-gray-100">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
