import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SidebarLoader = () => {
  return (
    <div className="flex flex-col items-start gap-1 pt-4">
      <div className="flex flex-col gap-2">
        <Skeleton height={40} width={300} />
        <Skeleton height={40} width={300} />
      </div>
    </div>
  );
};

export default SidebarLoader;
