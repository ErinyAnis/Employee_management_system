import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Btn from "../ui/Btn";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <div className="flex w-full items-center justify-between bg-teal-600 px-5 py-2 text-white">
      <Link to={"/"}>
        <h3 className="font-signika text-center text-lg lg:text-2xl">
          Employee MS
        </h3>
      </Link>
      <p>Welcome {user?.name}</p>
      <Btn
        className="bg-teal-700 font-semibold hover:bg-teal-600"
        onClick={logout}
      >
        Logout
      </Btn>
    </div>
  );
};

export default Navbar;
