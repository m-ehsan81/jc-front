import clsx from "clsx";
import { CustomContentProps, SnackbarContent } from "notistack";
import { forwardRef } from "react";

const CustomNotistack = forwardRef<HTMLDivElement, CustomContentProps>(
  ({ id, message, iconVariant, variant, ...props }, ref) => {
    const baseClasses =
      "bg-[#1C274C] p-2 rounded-xl border shadow-[-4px_-2px_4px_0_rgba(0,0,0,0.50),4px_8px_4px_0_rgba(0,0,0,0.50)]";

    const variantClasses: { [key in typeof variant]: string } = {
      error: "border-[#FF647C]",
      success: "border-[#00C48C]",
      warning: "border-[#FFC24E]",
      default: "border-[#00C48C]",
      info: "border-[#00C48C]",
    };

    return (
      <SnackbarContent
        ref={ref}
        role="alert"
        {...props}
        className={clsx(baseClasses, variantClasses[variant])}
        id={typeof id === "string" ? id : String(id)}
      >
        <div className="w-[21.375rem] flex gap-2">
          {iconVariant[variant]}
          <p className="flex-1">{message}</p>
        </div>
      </SnackbarContent>
    );
  }
);

CustomNotistack.displayName = "CustomNotistack";

export default CustomNotistack;
