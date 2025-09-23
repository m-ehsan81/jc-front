import clsx from "clsx";
import type { JSX } from "react";

import { LoadingSVG } from "@/svgs";

import { CustomButtonProps } from "./type";

const CustomButton = (props: CustomButtonProps): JSX.Element => {
  const { endIcon, startIcon, isLoading, children, className, ...rest } = props;

  const buttonClasses = clsx(
    "bg-foreground text-background text-3xl h-16 w-full rounded-xl cursor-pointer inset-shadow-button/60 flex items-center justify-center gap-4",
    { "pointer-events-none cursor-default": isLoading },
    className
  );

  return (
    <button className={buttonClasses} {...rest}>
      {isLoading ? (
        <>
          <LoadingSVG />
          <span>Loading</span>
        </>
      ) : (
        <>
          {startIcon}
          {children}
          {endIcon}
        </>
      )}
    </button>
  );
};

export default CustomButton;
