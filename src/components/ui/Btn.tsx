import { twMerge } from "tailwind-merge";

interface IProps {
  children: string;
  className?: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
}

const Btn = ({ children, className, onClick, type, disabled }: IProps) => {
  return (
    <button
      className={twMerge(
        "cursor-pointer rounded bg-teal-600 px-4 py-2 font-bold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-gray-500",
        className,
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Btn;
