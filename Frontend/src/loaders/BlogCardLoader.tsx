import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BlogCardLoader = () => {
  return (
    <div className="flex flex-col items-start gap-1 pt-5">
      <div className="flex gap-4 items-center">
        <Skeleton style={{ borderRadius: "50%", width: 40, height: 40 }} />
        <Skeleton height={25} width={150} />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton height={30} width={600} />
        <Skeleton height={30} width={600} />
        <Skeleton height={30} width={600} />
      </div>
    </div>
  );
};

export default BlogCardLoader;
