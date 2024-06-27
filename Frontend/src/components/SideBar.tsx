
import { Blog } from "../context/Context";

interface SideBarProps {
  tags: Array<string>;
}
interface AuthorProps {
  authorName: string;
  authorBio: string;
  authorImg: string;
}

const Author = ({ authorName, authorBio, authorImg }: AuthorProps) => {
  return (
    <div className="flex flex-col items-center   ">
      <div className="flex items-center justify-between w-full ">
       <div className="flex gap-4 items-center">
       {
        authorImg ?

         <img
            src={authorImg}
            className="rounded-full cursor-pointer h-10 w-10  bottom-2"
            alt="ProfileImage"
          />
          : <span  className=" flex flex-col pt-2 items-center h-9 w-9 cursor-pointer rounded-full text-center bg-slate-300  ">
          <i className="fa-regular fa-user text-xl   font-normal text-gray-600"></i>
          </span>

      }
        

        <div className="flex flex-col items-start ">
          <span className="text-base font-bold cursor-pointer">{authorName}</span>
          <span className="text-sm text-gray-500">{authorBio}</span>
        </div>
       </div>
        <button
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-black focus:ring-4 focus:ring-gray-100 font-medium rounded-2xl h-8 px-4 text-sm  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 hover:text-white dark:focus:ring-gray-700"
        >
          Follow
        </button>
      </div>
    </div>
  );
};

export const SideBar = ({ tags }: SideBarProps) => {
  const {users } = Blog();
  const idString = localStorage.getItem("user");
  const id  = JSON.parse(idString || "{}").id;
 
  const filteredUsers = users.filter(user => user?.id !== id);
  
 
  return (
   
   
     <div className="md:flex flex-col   md:w-[25%]  gap-12 pl-5 w-full overflow-y-hidden py-10  border-l-2  sm:hidden">
      <div className="flex flex-col gap-4 flex-start w-full ">
        <span className="font-semibold text-base">Recommended Topics</span>
        <div className="flex flex-wrap gap-4">
          {tags.map((tag, index) => {
            return (
              <span
                key={index}
                className="bg-gray-200 cursor-pointer p-3 rounded-3xl text-sm flex font-medium"
              >
                {tag}
              </span>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col flex-start gap-4">
        <span className="font-semibold text-base">Who to follow</span>
        {filteredUsers.map((user:any, index)=>{
          return(
            <Author key={index}
          authorName={user.name}
          authorBio={user.bio}
          authorImg={user.img}
        />
          )
        })}
      </div>
      <div className="flex flex-col flex-start gap-4">
        <span className="font-semibold text-base">Reading list</span>
        <span className="text-gray-400 flex-wrap flex font-semibold text-base">
          <span className="flex gap-1">
            click the
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="gray"
              height="25px"
              width="25px"
              viewBox="0 0 384 512"
            >
              <path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" />
            </svg>
            on any story to easily add 
          </span>
         it to your reading list to get custom story recommendations
        </span>
      </div>
      
    </div>
      
   
  );
};
