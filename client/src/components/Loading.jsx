import { AiOutlineLoading3Quarters } from "react-icons/ai";
const Loading = () => {
  return (
    <div className="flex min-h-screen min-w-full items-center justify-center">
      <span className="">
        <AiOutlineLoading3Quarters className="animate-spin text-4xl" />
      </span>
    </div>
  );
};

export default Loading;
