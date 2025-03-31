import { TableColumn } from "react-data-table-component";
import { LeaveType } from "../types/Leave";
import { JSX } from "react";

enum StatusType {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}

export interface LeaveRow {
  sno: number;
  employeeId: string;
  name: string;
  leaveType: LeaveType;
  department: string;
  days: string;
  status: StatusType;
  action: JSX.Element;
}

export const columns: TableColumn<LeaveRow>[] = [
  {
    name: "S No",
    cell: (row: LeaveRow) => (
      <div className="w-full text-center">{row.sno}</div>
    ),
    width: "70px",
  },
  {
    name: "Emp ID",
    cell: (row: LeaveRow) => (
      <div className="w-full text-center">{row.employeeId}</div>
    ),
    width: "140px",
  },
  {
    name: "Name",
    cell: (row: LeaveRow) => (
      <div className="w-full text-center">{row.name}</div>
    ),
    width: "140px",
  },
  {
    name: "Leave Type",
    cell: (row: LeaveRow) => (
      <div className="w-full text-center">{row.leaveType}</div>
    ),
    width: "140px",
  },
  {
    name: "Department",
    cell: (row: LeaveRow) => (
      <div className="w-full text-center">{row.department}</div>
    ),
    width: "170px",
  },
  {
    name: "Days",
    cell: (row: LeaveRow) => (
      <div className="w-full text-center">{row.days}</div>
    ),
    width: "140px",
  },
  {
    name: "Status",
    cell: (row: LeaveRow) => (
      <div className="w-full text-center">{row.status}</div>
    ),
    width: "140px",
  },
  {
    name: "Action",
    cell: (row: LeaveRow) => (
      <div className="w-full text-center min-w-[120px]">{row.action}</div>
    ),
    // width: "200px",
  },
];
