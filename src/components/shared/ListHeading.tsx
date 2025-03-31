import { Link } from "react-router-dom";
import Btn from "../ui/Btn";
import { useAuth } from "../../context/AuthContext";

interface IProps {
  functionProp?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  addTitle: string;
  addURL: string;
  inputPlaceholder: string;
  leave?: boolean;
  filterByButton?: (status: "Pending" | "Approved" | "Rejected") => void;
  LeaveDiableBtnForAdmin?: boolean;
}

const ListHeading = ({
  functionProp,
  title,
  addTitle,
  addURL,
  inputPlaceholder,
  leave,
  filterByButton,
  LeaveDiableBtnForAdmin,
}: IProps) => {
  const { user } = useAuth();

  return (
    <>
      <div className="text-center">
        <h3 className="mb-5 text-2xl font-bold">{title}</h3>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <input
          onChange={functionProp}
          type="text"
          placeholder={inputPlaceholder}
          className="text-14px rounded border border-gray-400 bg-white px-2 py-1.5 transition focus:border-gray-700 lg:px-3 lg:py-2 lg:text-[15px]"
        />
        {leave ? (
          <div className="flex flex-wrap gap-2">
            <Btn
              className="max-lg:text-sm"
              onClick={() => filterByButton && filterByButton("Pending")}
            >
              Pending
            </Btn>
            <Btn
              className="max-lg:text-sm"
              onClick={() => filterByButton && filterByButton("Approved")}
            >
              Approved
            </Btn>
            <Btn
              className="max-lg:text-sm"
              onClick={() => filterByButton && filterByButton("Rejected")}
            >
              Rejected
            </Btn>
          </div>
        ) : LeaveDiableBtnForAdmin && user?.role === "employee" ? (
          <Link
            to={addURL}
            className="rounded bg-teal-600 px-3 py-2 text-white transition hover:bg-teal-700 max-md:text-sm lg:px-5"
          >
            {addTitle}
          </Link>
        ) : (
          <Link
            to={addURL}
            className="rounded bg-teal-600 px-3 py-2 text-white transition hover:bg-teal-700 max-md:text-sm lg:px-5"
          >
            {addTitle}
          </Link>
        )}
      </div>
    </>
  );
};

export default ListHeading;
