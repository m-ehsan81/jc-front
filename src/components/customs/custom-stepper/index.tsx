import { StepperArrowSVG } from "@/svgs";
import { CustomStepperProps } from "./type";

const StepItem: React.FC<{ step: number; activeStep: number }> = ({
  step,
  activeStep,
}) => {
  return (
    <span
      aria-checked={step <= activeStep}
      className="inline-block w-6 h-6 border border-[#5CF8FD] rounded-full text-center text-[1.25rem] text-[#5CF8FD] bg-transparent leading-6 aria-checked:bg-[#5CF8FD] aria-checked:text-[#1C274C]"
    >
      {step}
    </span>
  );
};

const CustomStepper: React.FC<CustomStepperProps> = ({
  activeStep,
  totlaSteps,
}) => {
  return (
    <div className="flex gap-10  [&_div:last-child_svg]:hidden [&_div:nth-child(even)_svg]:top-1 [&_div:nth-child(even)_svg]:scale-y-[-1]">
      {[...Array(totlaSteps)].map((_, index) => (
        <div key={index} className="relative">
          <StepItem step={index + 1} activeStep={activeStep} />

          <StepperArrowSVG classname="absolute left-6 -top-6" />
        </div>
      ))}
    </div>
  );
};

export default CustomStepper;
