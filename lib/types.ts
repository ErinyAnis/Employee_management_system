import { z } from "zod";

// login
export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

// add employee
export const employeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  employeeId: z.string().min(1, "Employee ID is required"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  maritalStatus: z.string().min(1, "Marital status is required"),
  designation: z.string().min(1, "Designation is required"),
  department: z.string().min(1, "Department is required"),
  salary: z.string().min(1, "Salary is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().min(1, "Role is required"),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Image is required"),
});

export type TEmployeeSchema = z.infer<typeof employeeSchema>;

// add department
export const departmentSchema = z.object({
  dep_name: z.string().min(1, "Department name is required"),
  description: z.string().min(1, "Description is required"),
});

export type TDepartmentSchema = z.infer<typeof departmentSchema>;

//add salary
export const salarySchema = z.object({
  departmentId: z.string().min(1, "Department is required"),
  employeeId: z.string().min(1, "Employee is required"),
  basicSalary: z.number().min(0, "Basic salary must be positive"),
  allowances: z.number().min(0, "Allowances must be positive"),
  deductions: z.number().min(0, "Deductions must be positive"),
  payDate: z
    .string()
    .min(1, "Pay date is required")
    .refine(
      (date) => new Date(date) <= new Date(),
      "Pay date cannot be in future",
    ),
});

// change password
export const passwordChangeSchema = z
  .object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type TPasswordChangeSchema = z.infer<typeof passwordChangeSchema>;

export type TSalarySchema = z.infer<typeof salarySchema>;

// leave
export const leaveSchema = z.object({
    leaveType: z.string().min(1, "Leave type is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    reason: z.string().min(10, "Reason must be at least 10 characters"),
  }).refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: "End date must be after start date",
    path: ["endDate"],
  });

  export type TLeaveSchema = z.infer<typeof leaveSchema>;
