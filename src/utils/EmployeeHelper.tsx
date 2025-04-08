import { useNavigate } from "react-router-dom";
import Btn from "../components/ui/Btn";
import { JSX } from "react";
import { TableColumn } from "react-data-table-component";

interface EmployeeRow {
  sno: number;
  name: string;
  profileImage: JSX.Element;
  dep_name: string;
  dob: string;
  action: JSX.Element;
}

export const columns: TableColumn<EmployeeRow>[] = [
  {
    name: "S No",
    selector: (row: EmployeeRow) => row.sno,
    cell: (row: EmployeeRow) => <div className="text-center w-full">{row.sno}</div>,
  },
  {
    name: "Name",
    selector: (row: EmployeeRow) => row.name,
    cell: (row: EmployeeRow) => <div className="text-center w-full">{row.name}</div>,
    sortable: true,
  },
  {
    name: "Image",
    cell: (row: EmployeeRow) => <div className="text-center w-full">{row.profileImage}</div>,
  },
  {
    name: "Department",
    selector: (row: EmployeeRow) => row.dep_name,
    cell: (row: EmployeeRow) => <div className="text-center w-full">{row.dep_name}</div>,
    sortable: true,
  },
  {
    name: "DOB",
    selector: (row: EmployeeRow) => row.dob,
    cell: (row: EmployeeRow) => <div className="text-center w-full">{row.dob}</div>,
    sortable: true, // Enable sorting
  },
  {
    name: "Action",
    cell: (row: EmployeeRow) => (
      <div className="text-center min-w-full">{row.action}</div>
    ),
    width: "350px",
  },
];

export const EmployeeButtons = ({ id }: { id: string }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center space-x-3">
      <Btn onClick={() => navigate(`/admin-dashboard/employees/${id}`)}>
        View
      </Btn>
      <Btn
        className="bg-blue-600 hover:bg-blue-700"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${id}`)}
      >
        Edit
      </Btn>
      <Btn
        className="bg-yellow-600 hover:bg-yellow-700"
        onClick={() => navigate(`/admin-dashboard/employees/salary/${id}`)}
      >
        Salary
      </Btn>
      <Btn
        className="bg-red-600 hover:bg-red-700"
        onClick={() => navigate(`/admin-dashboard/employee/leaves/${id}`)}
      >
        Leave
      </Btn>
    </div>
  );
};
