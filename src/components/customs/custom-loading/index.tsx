const CustomLoading: React.FC = () => {
  return (
    <div className="border-[.1875rem] border-[#5CF8FD] w-[12.5rem] h-[12.5rem] rounded-full text-center leading-[12.5rem] relative">
      <span className="text-[1.25rem]">LOADING...</span>

      <span className="bg-[#5CF8FD] inline-block w-4 h-4 rounded-full shadow-[0_0_20px_5px_#06F] absolute top-0 left-0 right-0 bottom-0 m-auto animate-loading"></span>
    </div>
  );
};

export default CustomLoading;
