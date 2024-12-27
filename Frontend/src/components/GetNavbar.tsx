import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

export const GetNavbar = () => {
  return (
    <div className="flex sticky  border-b-2 border-black flex-row justify-between bg-red-100 h-1/7 py-5 px-10 w-full">
      <img src={Logo} alt="logoImage" className="h-12 cursor-pointer" />
      <div className="flex   text-center gap-7">
        <Link to={"/signup"}>
          {" "}
          <span className="text-lg font-medium cursor-pointer"> Write </span>
        </Link>
        <Link to={"/signin"}>
          <span className="text-lg font-medium cursor-pointer"> Sign in </span>
        </Link>
        <Link to={"/signup"}>
          <button
            type="button"
            className="text-white py-2.5 bg-gray-800 hover:bg-white hover:text-black focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5   mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};
