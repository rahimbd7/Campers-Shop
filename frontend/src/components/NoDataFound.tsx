import { TentTree } from "lucide-react";
interface NoDataFoundProps {
  message?: string;
}

const NoDataFound = ({ message = "No products found" }: NoDataFoundProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
      <div className="mb-4">
        <TentTree className="w-16 h-16 text-[#605DFF] " />
      </div>

      <p className="text-lg sm:text-xl font-medium text-gray-600">
        {message}
      </p>
    </div>
  );
};

export default NoDataFound;
