const StepperArrowSVG: React.FC<{ className: string }> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="10"
      viewBox="0 0 40 10"
      fill="none"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.717158 6.98989C12.6082 -2.48764 27.4572 1.40885 38.8786 9.83179C39.0751 9.97609 39.3523 9.93471 39.4966 9.73826C39.6409 9.54182 39.5995 9.26465 39.403 9.12035C27.6622 0.460853 12.39 -3.44392 0.165985 6.29933C-0.0247602 6.45073 -0.0559269 6.72871 0.0962914 6.92022C0.247695 7.11096 0.525652 7.14211 0.717158 6.98989Z"
        fill="#5CF8FD"
      />
    </svg>
  );
};

export default StepperArrowSVG;
