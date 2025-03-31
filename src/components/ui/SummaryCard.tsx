import { IconType } from "react-icons";
import { useAuth } from "../../context/AuthContext";

interface IProps {
  icon: IconType;
  text: string;
  number?: number;
  color: string;
  employee?: boolean;
}

const SummaryCard = ({ icon: Icon, number, text, color, employee }: IProps) => {
  const {user}= useAuth()
  return (
    <div className="flex rounded bg-white">
      <div
        className={`flex items-center justify-center ${color} px-4 text-3xl text-white`}
      >
        <Icon />
      </div>
      <div className="py-1 pl-4">
        <p className="text-lg font-semibold">{text}</p>
        <p className="text-lg font-bold">{number}</p>
        {employee ? <p className="text-lg font-bold">{user?.name}</p> : null}
      </div>
    </div>
  );
};

export default SummaryCard;
