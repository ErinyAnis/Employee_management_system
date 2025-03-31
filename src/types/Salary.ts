export type Salary = {
  employeeId: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  payDate: string;
  netSalary?: string;
};
