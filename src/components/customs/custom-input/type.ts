import { InputHTMLAttributes } from "react";

export interface CustomInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isError?: boolean;
  helperText?: string | boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  clickableIcon?: boolean;
  onIconClicked?: () => void;
}
