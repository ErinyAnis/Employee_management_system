import { useEffect, useState } from "react";
import ListHeading from "../shared/ListHeading";
import Container from "../ui/Container";
import axios from "axios";
import { toast } from "react-toastify";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";
import { Employee } from "../../types/Employee";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const fetchEmployees = async () => {
    setEmpLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/employee`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response.data.success) {
        let sno = 1;

        const data = await response.data.employees.map((emp: Employee) => ({
          _id: emp._id,
          sno: sno++,
          dep_name: emp.department.dep_name,
          name: emp.userId?.name,
          dob: emp.dob ? new Date(emp.dob).toLocaleDateString() : "N/A",
          profileImage: (
            <img
              className="h-14 w-14 rounded object-cover object-top py-1 lg:h-20 lg:w-20"
              src={`${import.meta.env.VITE_BACKEND_URL}/${emp.userId?.profileImage}`}
              alt={emp.userId?.name}
            />
          ),
          action: <EmployeeButtons id={emp._id} />,
        }));
        setEmployees(data);
        setFilteredEmployees(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("error in getting employees");
    } finally {
      setEmpLoading(false);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const records = employees.filter((employee: { name: string }) =>
      employee.name.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setFilteredEmployees(records);
  };

  return (
    <Container>
      <ListHeading
        functionProp={handleFilter}
        title="Manage Employees"
        addTitle="Add New Employee"
        addURL="/admin-dashboard/employees/add-employee"
        inputPlaceholder="Search by employee name"
      />
      <div className="relative mt-5">
        {empLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="mx-auto max-w-[80vw] overflow-x-auto sm:max-w-[86vw] md:max-w-[88vw] lg:max-w-[75vw] xl:max-w-[90vw]">
            <DataTable
              columns={columns}
              data={filteredEmployees}
              className="pb-2"
              pagination
              responsive
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default List;
