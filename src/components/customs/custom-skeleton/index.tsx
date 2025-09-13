import { CSSProperties } from "react";
import clsx from "clsx";
import { CustomSkeletonProps } from "./type";

const CustomSkeleton: React.FC<CustomSkeletonProps> = ({
  variant = "text",
  width = "100%",
  height = "1.5rem",
  animation = "pulse",
  className = "",
  borderRadius = "0.25rem",
}) => {
  const baseClasses = "bg-[rgba(159,159,159,0.5)]";

  const animationClasses = {
    pulse: "animate-pulse",
    wave: "animate-wave overflow-hidden relative",
    none: "",
  };

  const variantStyles: CSSProperties = {
    height,
    width,
    borderRadius:
      variant === "text"
        ? "0.25rem"
        : variant === "circular"
        ? "50%"
        : borderRadius,
  };

  const classes = clsx(baseClasses, animationClasses[animation], className);

  return (
    <div className={classes} style={variantStyles}>
      {animation === "wave" && <div className="wave-shimmer" />}
    </div>
  );
};

export default CustomSkeleton;
