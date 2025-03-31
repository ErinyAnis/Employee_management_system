export type Employee = {
  _id: string;
  employeeId?: string;
  department: {
    dep_name: string;
    _id?: string;
  };
  userId: {
    name: string;
    profileImage?: string;
  };
  dob?: Date | string;
  gender?: "Male"| "Female";
  maritalStatus?: "Single"| "Married";
  designation?: string;
  salary: number
};
