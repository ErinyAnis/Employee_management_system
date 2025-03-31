import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import SidebarLink from "../ui/SidebarLink";

const AdminSidebar = () => {
  return (
    <div className="bg-gray-800 text-white min-h-screen space-y-2 w-15 lg:w-64 py-2">

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
        <SidebarLink Icon={FaCalendarAlt} link="/admin-dashboard/leaves">
          Leaves
        </SidebarLink>
        <SidebarLink Icon={FaMoneyBillWave} link="/admin-dashboard/salary/add">
          Salary
        </SidebarLink>
        <SidebarLink Icon={FaCogs} link="/admin-dashboard/setting">
          Setting
        </SidebarLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
