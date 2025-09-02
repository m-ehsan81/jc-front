import clsx from "clsx";
import { CustomButtonProps } from "./type";

const CustomButton: React.FC<CustomButtonProps> = (props) => {
  const { endIcon, startIcon, children, className, ...rest } = props;

  const buttonClasses = clsx(
    "bg-white text-[#1C274C] text-[1.875rem] h-[4rem] w-full rounded-[.75rem] cursor-pointer shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.6)] flex items-center justify-center gap-4",
    className
  );

  return (
    <button className={buttonClasses} {...rest}>
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
};

export default CustomButton;
