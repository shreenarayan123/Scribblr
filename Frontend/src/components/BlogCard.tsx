import { useState } from "react";
import profile from "../assets/profile-10.jpg";
import img from "../assets/profile-9.jpg";
import { Link } from "react-router-dom";

interface BlogProps {
  title: string;
  content: string;
  publishedDate: string;
  authorName: string;
  tag: string;
}
export const BlogCard = ({
  title,
  authorName,
  publishedDate,
  content,
  tag,
}: BlogProps) => {
  const [more, setMore] = useState(false);
  const [follow, setFollow] = useState(false);

  return (
    <div className="flex flex-col items-center ">
      <div className=" flex  w-full justify-between">
        <div className="flex flex-col align-start py-5 w-3/4 gap-5">
        <Link to={'/blog/:id'}>
          <div className="flex flex-col gap-2">
            <div className="flex items-center  gap-2">
              <img
                className="w-8 h-8 rounded-full cursor-pointer"
                src={profile}
                alt="Rounded avatar"
              />
              <div className=" font-semibold cursor-pointer ">{authorName}</div>
              <div className="text-2xl text-gray-400 relative bottom-1.5">
                .
              </div>
              <div className="text-gray-400 ">{publishedDate} </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="font-bold text-xl  cursor-pointer">{title} </div>
              <div className="font-serif cursor-pointer">
                {content.slice(0, 200) + "..."}
              </div>
            </div>
          </div>
          </Link>
          <div className="flex items-center w-full justify-between">
            <div className="flex flex-row items-center gap-3">
              <span className="bg-gray-200 px-2 cursor-pointer py-1 rounded-3xl text-sm ">
                {tag}
              </span>
              <span className="text-gray-400 text-sm cursor-pointer">
                {`${Math.ceil(content.length / 100)} min read`}{" "}
              </span>
            </div>
            <span className="flex items-center gap-3 text-gray-400 h-5 relative cursor-pointer">
              {follow ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => setFollow(!follow)}
                  fill="black"
                  height="20px"
                  width="20px"
                  viewBox="0 0 384 512"
                >
                  <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => setFollow(!follow)}
                  fill="gray"
                  height="20px"
                  width="20px"
                  viewBox="0 0 384 512"
                >
                  <path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" />
                </svg>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => setMore(!more)}
                fill="gray"
                height="20px"
                width="20px"
                viewBox="0 0 448 512"
              >
                <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
              </svg>
              {more && (
                <div
                  className="flex flex-col justify-center bg-slate-100 shadow-md  absolute bottom-4 left-5 text-black  text-sm  rounded-xl  font-semibold w-28 h-8  text-center"
                >
                  Follow Author
                </div>
              )}
            </span>
          </div>
        </div>
        <div className="flex w-1/4 py-14 pl-8">
          <img src={img} alt="BlogImage" />
        </div>
      </div>
      <hr className=" w-full" />
    </div>
  );
};
