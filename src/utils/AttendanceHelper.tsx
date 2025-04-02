import { TattendaceData } from "../components/attendance/Attendance";

export const columns = [
  {
    name: "S No",
    cell: (row: TattendaceData) => (
      <div className="mx-auto text-center">{row.sno}</div>
    ),
    width: "70px",
  },
  {
    name: "Name",
    cell: (row: TattendaceData) => (
      <div className="mx-auto text-center">{row.name}</div>
    ),
    width: "150px",
    sortable: true,
  },
  {
    name: "Emp ID",
    cell: (row: TattendaceData) => (
      <div className="mx-auto text-center">{row.employeeId}</div>
    ),
    width: "150px",
    sortable: true,
  },
  {
    name: "Department",
    cell: (row: TattendaceData) => (
      <div className="mx-auto text-center">{row.department}</div>
    ),
    width: "140px",
    sortable: true,
  },
  {
    name: "Action",
    cell: (row: TattendaceData) => (
      <div className="mx-auto min-w-[325px] text-center">{row.action}</div>
    ),
  },
];
