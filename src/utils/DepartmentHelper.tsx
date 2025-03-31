import { TableColumn } from "react-data-table-component";
import { Department } from "../types/Department";
import DepartmentButtons from "../components/department/DepartmentButtons";

export const getColumns = (
  onDepartmentDelete: (_id: string) => void,
): TableColumn<Department>[] => [
  {
    name: "S No",
    selector: (row) => row.sno,
    cell: (row) => <div className="text-center w-full">{row.sno}</div>,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
    cell: (row) => <div className="text-center w-full">{row.dep_name}</div>,
  },
  {
    name: "Action",
    cell: (row) => (
      <DepartmentButtons
        _id={row._id}
        onDepartmentDelete={onDepartmentDelete}
      />
    ),
    width: "350px",
  },
];
