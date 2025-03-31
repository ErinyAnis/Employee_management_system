import { useEffect, useState } from "react";
import Container from "../ui/Container";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

type Salary = {
  employeeId: {
    employeeId: string;
  };
  basicSalary: number;
  allowances: number;
  deductions: number;
  payDate: string;
  netSalary?: string;
};

const View = () => {
  const [salaries, setSalaries] = useState<Salary[]>([]);
  const [filteredSalaries, setFilteredSalaries] = useState<Salary[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  const { id } = useParams<{ id: string }>();
  const {user}= useAuth()

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/salary/${id}/${user?.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error in getting salaries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchSalaries();
    }
  }, [id]);

  const filterSalaries = (q: string) => {
    const filteredRecords = salaries?.filter((salary) =>
      salary.employeeId?.employeeId
        .toLocaleLowerCase()
        .includes(q.toLocaleLowerCase()),
    );
    setFilteredSalaries(filteredRecords || []);
  };

  return (
    <Container>
      <div className="py-5">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Salary History</h2>
        </div>
        <div className="my-3 flex justify-end">
          <input
            type="text"
            placeholder="Search by emb ID"
            className="rounded-md border border-gray-300 px-2 py-0.5"
            onChange={(e) => filterSalaries(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : filteredSalaries.length > 0 ? (
        <div className="mx-auto max-w-[80vw] overflow-x-auto sm:max-w-[86vw] md:max-w-[90vw] lg:max-w-[100vw] xl:max-w-[100vw]">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="border border-gray-200 bg-gray-50 text-xs text-gray-700 uppercase">
              <tr>
                <th className="px-6 py-3">SNO</th>
                <th className="px-6 py-3">Emp ID</th>
                <th className="px-6 py-3">Salary</th>
                <th className="px-6 py-3">Allowance</th>
                <th className="px-6 py-3">Deduction</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Pay Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredSalaries.map((salary, index) => (
                <tr
                  key={index}
                  className="border-b bg-white dark:border-gray-800 dark:bg-gray-700"
                >
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{salary.employeeId?.employeeId}</td>
                  <td className="px-6 py-3">{salary.basicSalary}</td>
                  <td className="px-6 py-3">{salary.allowances}</td>
                  <td className="px-6 py-3">{salary.deductions}</td>
                  <td className="px-6 py-3">{salary.netSalary}</td>
                  <td className="px-6 py-3">
                    {salary.payDate
                      ? new Date(salary.payDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No Records</div>
      )}
    </Container>
  );
};

export default View;
