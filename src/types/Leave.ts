export enum LeaveType {
  SICK_LEAVE = "Sick Leave",
  CASUAL_LEAVE = "Casual Leave",
  ANNUAL_LEAVE = "Annual Leave",
}

type EmployeeId = {
  employeeId: string;
  userId: { name: string; profileImage: string };
  department: { dep_name: string };
};

export enum Status {
  Pending = "Pending",
  APPROVED = "Approved",
  REJECTED = "Rejected",
}

export type Leave = {
  _id: string;
  leaveType: LeaveType;
  employeeId?: EmployeeId;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: Status;
};
