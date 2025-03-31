import { twMerge } from 'tailwind-merge';

interface IProps {
    children: React.ReactNode;
    className? : string;
}

const Container = ({children, className}:IProps) => {
  return (
    <div className={twMerge("p-3 lg:p-5 mx-auto", className)}>{children}</div>
  )
}

export default Container