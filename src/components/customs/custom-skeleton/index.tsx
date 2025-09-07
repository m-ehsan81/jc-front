// components/CustomSkeleton.tsx
import { CSSProperties } from "react";

interface CustomSkeletonProps {
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
  animation?: "pulse" | "wave" | "none";
  className?: string;
  borderRadius?: string;
}

const CustomSkeleton = ({
  variant = "text",
  width = "100%",
  height = "1rem",
  animation = "pulse",
  className = "",
  borderRadius = "0.25rem",
}: CustomSkeletonProps) => {
  const baseClasses = "bg-gray-300 dark:bg-gray-700";

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

  return (
    <div
      className={`${baseClasses} ${animationClasses[animation]} ${className}`}
      style={variantStyles}
    >
      {animation === "wave" && <div className="wave-shimmer"></div>}
    </div>
  );
};

export default CustomSkeleton;
