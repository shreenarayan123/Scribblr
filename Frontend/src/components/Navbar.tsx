import { useState } from "react";
import UserModal from "./UserModal";
import Logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { Blog } from "../context/Context";
import { Search } from "../context/Filter";
import { debounce } from "../uility/debounce";

export const Navbar = () => {
  const { blogContent } = Blog();
  const { setSearchBlog } = Search();
  const [showUser, setShowUser] = useState(false);

  const currentUser = localStorage.getItem("user");
  const userDetails = JSON.parse(currentUser || "{}");

  const { pathname } = useLocation();
  const { setPreview } = Blog();

  const handleSearch = debounce((value: string) => {
    setSearchBlog(value);
  }, 300);

  return (
    <div className="flex flex-col w-full sticky top-0 bg-white">
      <div className="flex justify-between w-full  py-4 px-8 ">
        <div className="flex items-center gap-5">
          <Link to={"/blogs"}>
            <img src={Logo} alt="logoImage" className="h-12" />
          </Link>

          <form className="max-w-md mx-auto">
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input
                type="search"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleSearch(e.target.value)
                }
                className="block w-full px-4 py-3 ps-10 text-sm text-gray-900 border border-none rounded-full bg-gray-100 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400  dark:focus:border-blue-500"
                placeholder="Search Blogs , stories....."
                required
              />
            </div>
          </form>
        </div>
        <div className="flex items-center gap-4 ">
          {pathname == "/new-story" ? (
            <button
              disabled={blogContent == false}
              onClick={() => setPreview(true)}
              type="button"
              className={`text-white   ${
                blogContent
                  ? "bg-green-700 border border-green-300 hover:bg-green-600 "
                  : " bg-green-300 border border-green-100 "
              }   focus:outline-none  focus:ring-4 focus:ring-gray-100 font-medium rounded-3xl h-9 px-4 text-base  `}
            >
              Publish
            </button>
          ) : (
            <Link to={"/new-story"}>
              <div className="flex gap-4">
                <span className="flex items-center gap-4 text-2xl font-normal cursor-pointer text-gray-600">
                  <i className="fa-regular fa-pen-to-square"></i>
                </span>
                <span className="flex items-center gap-4 text-lg font-normal text-gray-600">
                  Write
                </span>
              </div>
            </Link>
          )}
          {pathname.startsWith("/edit-blog") && (
            <button
              disabled={blogContent == false}
              onClick={() => setPreview(true)}
              type="button"
              className={
                "text-white bg-green-700 border cursor-pointer border-green-300 hover:bg-green-600    focus:outline-none  focus:ring-4 focus:ring-gray-100 font-medium rounded-3xl h-9 px-4 text-base  "
              }
            >
              Update
            </button>
          )}
          <div className=" group">
            {userDetails.img ? (
              <img
                onClick={() => setShowUser(!showUser)}
                src={userDetails.img}
                className="rounded-full cursor-pointer h-12 w-12  bottom-2"
                alt="ProfileImage"
              />
            ) : (
              <span
                onClick={() => setShowUser(!showUser)}
                className=" flex flex-col pt-3 items-center h-12 w-12 cursor-pointer rounded-full text-center bg-slate-300  "
              >
                <i className="fa-regular fa-user text-2xl   font-normal text-gray-600"></i>
              </span>
            )}

            <div className="hidden group-hover:block flex-col items-center bg-black absolute px-2.5 py-2 text-white top-20 right-3 rounded-lg">
              <span className="absolute  bg-black h-5 w-5 rotate-45 left-12 top-[-10px]"></span>
              view profile
            </div>
          </div>
        </div>
      </div>
      <hr />
      {showUser && <UserModal />}
    </div>
  );
};
