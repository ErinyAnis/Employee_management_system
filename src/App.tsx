import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import { ToastContainer } from "react-toastify";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
import Department from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartment";
import EditDepartment from "./components/department/EditDepartment";
import List from "./components/employee/List";
import Add from "./components/employee/Add";
import View from "./components/employee/View";
import Edit from "./components/employee/Edit";
import AddSalary from "./components/salary/Add";
import ViewSalary from "./components/salary/View";
import SummaryCard from "./components/ui/SummaryCard";
import { FaUser } from "react-icons/fa";
import Container from "./components/ui/Container";
import Profile from "./components/EmployeeDashboard/Profile";
import LeaveList from "./components/leaves/List";
import AddLeave from "./components/leaves/Add";
import Setting from "./components/EmployeeDashboard/Setting";
import Table from "./components/leaves/Table";
import Detail from "./components/leaves/Detail";
import Unauthorized from "./components/Unauthorized";
import Attendance from "./components/attendance/Attendance";
import AttendanceReport from "./components/attendance/AttendanceReport";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoutes>
                <RoleBaseRoutes requiredRole={["admin"]}>
                  <AdminDashboard />
                </RoleBaseRoutes>
              </PrivateRoutes>
            }
          >
            <Route index element={<AdminSummary />}></Route>
            {/* departments */}
            <Route
              path="/admin-dashboard/departments"
              element={<Department />}
            ></Route>
            <Route
              path="/admin-dashboard/departments/add-department"
              element={<AddDepartment />}
            ></Route>
            <Route
              path="/admin-dashboard/department/:id"
              element={<EditDepartment />}
            ></Route>

            {/* employees */}
            <Route path="/admin-dashboard/employees" element={<List />}></Route>
            <Route
              path="/admin-dashboard/employees/add-employee"
              element={<Add />}
            ></Route>
            <Route
              path="/admin-dashboard/employees/:id"
              element={<View />}
            ></Route>
            <Route
              path="/admin-dashboard/employees/edit/:id"
              element={<Edit />}
            ></Route>
            <Route
              path="/admin-dashboard/employees/salary/:id"
              element={<ViewSalary />}
            ></Route>

            {/* leaves */}
            <Route path="/admin-dashboard/leaves" element={<Table />}></Route>
            <Route
              path="/admin-dashboard/leaves/:id"
              element={<Detail />}
            ></Route>
            <Route
              path="/admin-dashboard/employees/leaves/:id"
              element={<LeaveList />}
            ></Route>

            {/* salary */}
            <Route
              path="/admin-dashboard/salary/add"
              element={<AddSalary />}
            ></Route>

            {/* Attendance */}
            <Route
              path="/admin-dashboard/attendance"
              element={<Attendance />}
            ></Route>
            {/* Attendance report */}
            <Route
              path="/admin-dashboard/attendance-report"
              element={<AttendanceReport />}
            ></Route>

            {/* setting */}
            <Route
              path="/admin-dashboard/setting"
              element={<Setting />}
            ></Route>
          </Route>

          {/* employee */}
          <Route
            path="/employee-dashboard"
            element={
              <PrivateRoutes>
                <RoleBaseRoutes requiredRole={["admin", "employee"]}>
                  <EmployeeDashboard />
                </RoleBaseRoutes>
              </PrivateRoutes>
            }
          >
            <Route
              index
              element={
                <Container>
                  <SummaryCard
                    color="bg-teal-600"
                    icon={FaUser}
                    text="Welcome Back"
                    employee
                  />
                </Container>
              }
            ></Route>

            <Route
              path="/employee-dashboard/profile/:id"
              element={<Profile />}
            ></Route>
            <Route
              path="/employee-dashboard/leaves/:id"
              element={<LeaveList />}
            ></Route>
            <Route
              path="/employee-dashboard/leaves/add-leave"
              element={<AddLeave />}
            ></Route>
            <Route
              path="/employee-dashboard/salary/:id"
              element={<ViewSalary />}
            ></Route>
            <Route
              path="/employee-dashboard/setting"
              element={<Setting />}
            ></Route>
          </Route>
          <Route path="/unauthorized" element={<Unauthorized />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
