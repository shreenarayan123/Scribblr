import mentalhealth from "../assets/mentalhealth.jpg";
import business from "../assets/business.jpg";
import ai from "../assets/ai.jpg";
import { Link } from "react-router-dom";

export const GetBanner = () => {
  return (
    <div className="flex  flex-col  items-center justify-center  relative gap-5 bg-red-100 w-full  h-full  ">
      <div className="md:flex flex-row absolute top-0 right-0 sm:hidden items-center gap-5 ">
        <div className="flex  itmes-center justify-center gap-5">
          <span className="font-sans text-base font-medium">1.3k stories</span>
          <span className="bg-gray-300 relative bottom-2 cursor-pointer p-3 rounded-3xl text-sm flex font-medium">
            mental health
          </span>
        </div>
        <img src={mentalhealth} className="h-60" alt="story1" />
      </div>
      <div className="flex flex-col items-center gap-9">
        <span className="font-serif text-8xl flex flex-col items-center font-medium">
          <span> Personal </span>

          <span> insights & ideas</span>
        </span>

        <span className="font-sans text-2xl">
          An place where diverse voices share stories and insights.
        </span>
        <Link to={"/signup"}>
          <button
            type="button"
            className="text-white py-2.5 bg-green-600 hover:bg-white hover:text-green-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-lg px-8   mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Started Reading
          </button>
        </Link>
      </div>
      <div className="md:flex flex-row absolute sm:hidden bottom-0 right-0 items-center gap-5 ">
        <div className="flex itmes-center justify-center gap-5">
          <span className="font-sans text-base font-medium">1.8k stories</span>
          <span className="bg-gray-300 relative bottom-2 cursor-pointer p-3 rounded-3xl text-sm flex font-medium">
            bussiness
          </span>
        </div>
        <img src={business} className="w-60" alt="story1" />
      </div>
      <div className="md:flex flex-row absolute sm:hidden bottom-1/2 left-0 items-center gap-5 ">
        <img src={ai} className="w-60" alt="story1" />
        <div className="flex itmes-center justify-center gap-5">
          <span className="bg-gray-300 cursor-pointer relative bottom-2 p-3 rounded-3xl text-sm flex font-medium">
            Ai
          </span>
          <span className="font-sans text-base font-medium">2k stories</span>
        </div>
      </div>
    </div>
  );
};
