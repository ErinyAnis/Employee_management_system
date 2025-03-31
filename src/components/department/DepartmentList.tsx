import DataTable from "react-data-table-component";
import { getColumns } from "../../utils/DepartmentHelper";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import Container from "../ui/Container";
import { Department } from "../../types/Department";
import ListHeading from "../shared/ListHeading";

const DepartmentList = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState<Department[]>(
    [],
  );

  // Handle department deletion
  const onDepartmentDelete = async (_id: string) => {
    setDepartments((prev) => prev.filter((dep) => dep._id !== _id));

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/department/${_id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );

      toast.success("Department deleted successfully");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.warn("Department not found, already deleted.");
      } else {
        console.error("Deletion error:", error);
        toast.error("Deletion failed");
      }
    } finally {
      fetchDepartments();
    }
  };

  const fetchDepartments = async () => {
    setDepLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/department`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.data.success) {
        let sno = 1;
        const data = response.data.departments.map((dep: Department) => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
        }));
        setDepartments(data);
        setFilteredDepartments(data);
      }
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
      toast.error("Failed to fetch departments after deletion");
    } finally {
      setDepLoading(false);
    }
  };

  // Initial fetch when component mounts
  useEffect(() => {
    fetchDepartments();
  }, []);

  const filterDepartments = (e: React.ChangeEvent<HTMLInputElement>) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setFilteredDepartments(records);
  };

  return (
    <>
      {depLoading ? (
        <div className="m-3">Loading...</div>
      ) : (
        <Container>
          <ListHeading
            functionProp={filterDepartments}
            title="Manage Department"
            addTitle="Add New Department"
            addURL="/admin-dashboard/departments/add-department"
            inputPlaceholder="Search by dep name"
          />
          <div className="mx-auto mt-5 overflow-x-auto sm:max-w-[86vw] md:max-w-[88vw] lg:max-w-[75vw] xl:max-w-[90vw]">
            <DataTable
              columns={getColumns(onDepartmentDelete)}
              data={filteredDepartments}
              pagination
              responsive
              className="mx-auto"
            />
          </div>
        </Container>
      )}
    </>
  );
};

export default DepartmentList;
