import { useState, useRef } from "react";
import { useAllTags, useTag } from "../hooks/tag";
import { Search } from "../context/Filter";

export const TagsBar = () => {
  const [selectedTag, setSelectedTag] = useState<string>("For you");
  const { setFilter } = Search();

  const navRef = useRef<HTMLDivElement>(null);
  const { tags } = useTag();
  const { allTags } = useAllTags(tags);
  const feed = ["For you", "Following"];
  const allTagsOnPost = [...feed, ...allTags];
  const handleNav = (direction: string) => {
    if (navRef.current) {
      if (direction === "left") {
        navRef.current.scrollLeft -= 200;
      } else {
        navRef.current.scrollLeft += 200;
      }
    }
  };

  const handleSelectedtag = (tag: string) => {
    setSelectedTag(tag);
    setFilter(tag);
  };

  return (
    <div className="flex flex-center justify-center flex-row gap-5  pt-10  w-[80%]  ">
      <i
        onClick={() => handleNav("left")}
        className="fa-solid fa-chevron-left  text-xl pt-1  cursor-pointer"
      ></i>
      <div
        ref={navRef}
        className="flex  items-center gap-10 w-full border-b border-gray-300  overflow-auto scrollbar-hide overflow-y-hidden whitespace-nowrap scroll"
      >
        {allTagsOnPost?.map((tag, index) => {
          const isActive = selectedTag === tag;
          return (
            <div
              key={index}
              onClick={() => handleSelectedtag(tag)}
              className={`text-base pb-4 group-1  text-slate-500 cursor-pointer ${
                isActive ? "border-b-2  border-black" : ""
              }`}
            >
              {tag}
            </div>
          );
        })}
      </div>
      <i
        onClick={() => handleNav("right")}
        className="fa-solid fa-chevron-right text-xl pt-2 cursor-pointer"
      ></i>
    </div>
  );
};
