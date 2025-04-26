import React, {  useEffect, useMemo } from "react";
import { Blog } from "../context/Context";
import { useAllTags, useTag } from "../hooks/tag";
import { useFollowUser } from "../hooks/user";
import toast from "react-hot-toast";
import { Search } from "../context/Filter";
import SidebarLoader from "../loaders/SidebarLoader";

interface AuthorProps {
  authorName: string;
  authorBio: string;
  authorImg: string;
  authorId: string;
}

const Author = React.memo(
  ({ authorName, authorBio, authorImg, authorId }: AuthorProps) => {
    const { followUser, loading, error, isFollowing } = useFollowUser(authorId);

    useEffect(() => {
      if (error) {
        toast.error("Something went wrong, please try again later");
      }
    }, [error]);

    return (
      <div className="flex flex-col items-center ">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-4 items-center">
            {authorImg ? (
              <img
                src={authorImg}
                className="rounded-full cursor-pointer h-10 w-10 bottom-2"
                alt="ProfileImage"
              />
            ) : (
              <span className="flex flex-col pt-2 items-center h-9 w-9 cursor-pointer rounded-full text-center bg-slate-300">
                <i className="fa-regular fa-user text-xl font-normal text-gray-600"></i>
              </span>
            )}
            <div className="flex flex-col items-start">
              <span className="text-base font-bold cursor-pointer">
                {authorName}
              </span>
              <span className="text-sm text-gray-500">{authorBio}</span>
            </div>
          </div>
          <button
            onClick={() => followUser(authorId)}
            disabled={loading}
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-black focus:ring-4 focus:ring-gray-100 font-medium rounded-2xl h-8 px-4 text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 hover:text-white dark:focus:ring-gray-700"
          >
            {loading ? "Loading..." : isFollowing ? "Following" : "Follow"}
          </button>
        </div>
      </div>
    );
  }
);

export const SideBar = React.memo(() => {
  const { users } = Blog();
  const { filter, setFilter } = Search();
  const idString = localStorage.getItem("user");
  const id = useMemo(() => JSON.parse(idString || "{}").id, [idString]);
  const filteredUsers = useMemo(
    () => users.filter((user) => user?.id !== id),
    [users, id]
  );

  const { tags, loading } = useTag();
  const { allTags } = useAllTags(tags);

  const totalTags = allTags?.length || 0;
  const recommendatedTags = useMemo(
    () => Math.floor(Math.random() * (totalTags - 6)),
    [totalTags]
  );


  const handleTopic = (tag: string) => {
    setFilter((prevTopic) => (prevTopic == tag ? "" : tag));
  };

  return (
    <div className="md:flex md:flex-col md:w-[25%] gap-12 pl-5 w-full overflow-y-hidden py-10 border-l-2 hidden">
      <div className="flex flex-col gap-4 flex-start w-full">
        <span className="font-semibold text-base">Recommended Topics</span>
        {loading ? (
          <SidebarLoader />
        ) : (
          <div className="flex flex-wrap gap-4">
            {allTags && allTags.length > 0 ? (
              allTags
                .slice(recommendatedTags, recommendatedTags + 6)
                .map((tag: string, index: number) => (
                  <span
                    onClick={() => handleTopic(tag)}
                    key={index}
                    className={`${
                      filter == tag ? "bg-blue-300" : "bg-gray-200"
                    } cursor-pointer p-3 rounded-3xl text-sm flex font-medium`}
                  >
                    {tag}
                  </span>
                ))
            ) : (
              <div>No tags available</div>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col flex-start gap-5">
        <span className="font-semibold text-base">Who to follow</span>
        {loading ? (
          <SidebarLoader />
        ) : (
          <div>
            {filteredUsers
              .sort(() => 0.5 - Math.random()) // Shuffle the array
              .slice(0, 4) // Take only 4 random users
              .map((user: any, index) => (
          <Author
            key={index}
            authorName={user.name}
            authorBio={user.bio}
            authorImg={user.img}
            authorId={user.id}
          />
              ))}
          </div>
        )}
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
});
                                                                                           