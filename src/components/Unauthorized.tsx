import { Link } from "react-router-dom";
import Container from "./ui/Container";
import unAuthorized from "../assets/unauthorized.png";

const Unauthorized = () => {
  return (
    <Container className="text-center">
      <div className="flex flex-col items-center justify-center gap-y-5 h-[90vh]">
        <img src={unAuthorized} alt="unAuthorized" className="lg:h-36 h-28" />
        <h2 className="text-2xl font-semibold lg:text-4xl">
          Unauthorized Access
        </h2>
        <Link
          to={"/employee-dashboard"}
          className="block w-fit rounded-md border p-2 text-lg font-medium text-teal-500 transition hover:text-teal-600 lg:text-xl"
        >
          Return to home
        </Link>
      </div>
    </Container>
  );
};

export default Unauthorized;
