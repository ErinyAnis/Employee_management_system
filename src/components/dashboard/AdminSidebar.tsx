import {
  FaBuilding,
  FaCogs,
  FaMoneyBillWave,
  FaRegCalendarAlt,
  FaRegFileAlt,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import SidebarLink from "../ui/SidebarLink";

const AdminSidebar = () => {
  return (
    <div className="min-h-screen w-15 space-y-2 bg-gray-800 py-2 text-white lg:w-60 xl:w-64 ">
      <div>
        <SidebarLink Icon={FaTachometerAlt} link="/admin-dashboard">
          Dashboard
        </SidebarLink>
        <SidebarLink Icon={FaUsers} link="/admin-dashboard/employees">
          Employees
        </SidebarLink>
        <SidebarLink Icon={FaBuilding} link="/admin-dashboard/departments">
          Departments
        </SidebarLink>
        <SidebarLink Icon={FaSignOutAlt} link="/admin-dashboard/leaves">
          Leaves
        </SidebarLink>
        <SidebarLink Icon={FaMoneyBillWave} link="/admin-dashboard/salary/add">
          Salary
        </SidebarLink>
        <SidebarLink Icon={FaRegCalendarAlt} link="/admin-dashboard/attendance">
          Attendance
        </SidebarLink>
        <SidebarLink
          Icon={FaRegFileAlt}
          link="/admin-dashboard/attendance-report"
        >
          Attendance Report
        </SidebarLink>
        <SidebarLink Icon={FaCogs} link="/admin-dashboard/setting">
          Setting
        </SidebarLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
