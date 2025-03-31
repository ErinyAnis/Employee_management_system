import {
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUserCircle,
} from "react-icons/fa";
import SidebarLink from "../ui/SidebarLink";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen w-15 space-y-2 bg-gray-800 py-2 text-white lg:w-64">
      <div>
        <SidebarLink Icon={FaTachometerAlt} link="/employee-dashboard">
          Dashboard
        </SidebarLink>
        <SidebarLink
          Icon={FaUserCircle}
          link={`/employee-dashboard/profile/${user?._id}`}
        >
          My Profile
        </SidebarLink>
        <SidebarLink
          Icon={FaCalendarAlt}
          link={`/employee-dashboard/leaves/${user?._id}`}
        >
          Leaves
        </SidebarLink>
        <SidebarLink
          Icon={FaMoneyBillWave}
          link={`/employee-dashboard/salary/${user?._id}`}
        >
          Salary
        </SidebarLink>
        <SidebarLink Icon={FaCogs} link="/employee-dashboard/setting">
          Setting
        </SidebarLink>
      </div>
    </div>
  );
};

export default Sidebar;
