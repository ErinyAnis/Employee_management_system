import { NavLink } from "react-router-dom";
import { IconType } from "react-icons";

interface Props {
  link: string;
  Icon: IconType;
  children: string;
}

const SidebarLink = ({ link, Icon, children }: Props) => {
  const AdminEndLink = link === "/admin-dashboard";
  const EmpEndLink = link === "/employee-dashboard";
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `${isActive ? "bg-teal-500" : " "} mx-1 my-1 flex items-center space-x-4 rounded px-2 py-2 hover:bg-teal-500 lg:mx-3 lg:px-4 lg:py-2.5`
      }
      end={AdminEndLink || EmpEndLink}
    >
      <Icon className="min-w-8" />
      <span>{children}</span>
    </NavLink>
  );
};

export default SidebarLink;
