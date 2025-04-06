import { NavLink } from "react-router-dom";
import { IconType } from "react-icons";

interface Props {
  link: string;
  Icon: IconType;
  children: string;
}

const SidebarLink = ({ link, Icon, children }: Props) => {
  const isAdminDashboard = link === "/admin-dashboard";
  const isEmployeeDashboard = link === "/employee-dashboard";
  const isLeavesSection = link.includes("/leaves");

  return (
    <NavLink
      to={link}
      className={({ isActive }) => {
        // Get current path
        const currentPath = window.location.pathname;

        // For leaves section, check if current path starts with the leaves link
        const leavesActive =
          isLeavesSection &&
          (currentPath.startsWith(link) || currentPath.includes("/leaves/"));

        // For other links, use normal isActive
        const active = isActive || leavesActive;

        return `${active ? "bg-teal-500" : ""} mx-1 my-1 flex items-center space-x-4 rounded px-2 py-2 hover:bg-teal-500 lg:mx-3 lg:px-4 lg:py-2.5`;
      }}
      end={isAdminDashboard || isEmployeeDashboard}
    >
      <Icon className="min-w-8" />
      <span className="text-nowrap">{children}</span>
    </NavLink>
  );
};

export default SidebarLink;
