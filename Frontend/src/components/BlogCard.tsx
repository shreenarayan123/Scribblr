import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { formatDate } from "../uility/DateFormatter";
import DomPurify from "dompurify";
import { useBookmark } from "../hooks/bookmark";
import { useFollowUser } from "../hooks/user";

interface BlogProps {
  id: string;
  title: string;
  content: string;
  publishedDate: Date;
  updatedAt: Date;
  published: boolean;
  authorId: string;
  img: string;
  tags: tag[];
  clap: object[];
  bookmarks: object[];
}
type tag = {
  tagId: string;
};
type tagOnPost = {
  topic: string;
};
export const BlogCard = ({
  id,
  title,
  content,
  publishedDate,
  tags,
  authorId,
  img,
}: BlogProps) => {
  const [more, setMore] = useState(false);
  const [author, setAuthor] = useState("");
  const [authorImage, setAuthorImage] = useState("");
  const [tagsOnPost, setTagsOnPost] = useState<tagOnPost[]>([]);
  const [userAuthor, setUserAuthor] = useState(false);
  const formattedDate = formatDate(publishedDate);
  const headers = { Authorization: ` ${localStorage.getItem("token")}` };
  const { followUser, isFollowing } = useFollowUser(authorId);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleMore = () => {
    const currentUser = localStorage.getItem("user");
    const userDetails = JSON.parse(currentUser || "{}");
    const userName = userDetails.name;
    if (author == userName) {
      setUserAuthor(true);
    }
    setMore(!more);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${backendUrl}/blog/${id}`, { headers });
      toast.success(res.data.message);
      window.location.reload();
    } catch (error) {
      console.log("error", error);
      toast.error("Error deleting post");
    }
  };

  useEffect(() => {
    async function getUser() {
      try {
        const postUser = await axios.get(`${backendUrl}/user/${authorId}`);
        setAuthor(postUser.data.name);
        setAuthorImage(postUser.data.img);
      } catch (error) {
        console.log("error fetching user data", error);
        toast.error("Error fetching user data");
      }
    }
    async function getBlog() {
      try {
        const tagPromises = tags.map(async (tag) => {
          const singleTag = await axios.get(`${backendUrl}/tag/${tag.tagId}`, {
            headers,
          });
          return singleTag.data;
        });
        const tagResults = await Promise.all(tagPromises);

        setTagsOnPost(tagResults);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    }
    getUser();
    getBlog();
  }, [authorId, tags]);
  const { bookmark, isBookmarked } = useBookmark(id !== undefined ? id : "");
  const sanitizedContent = DomPurify.sanitize(content);

  return (
    <div className="flex flex-col items-center ">
      <Toaster />
      <div className=" flex  w-full justify-between">
        <div className="flex flex-col align-start py-5 w-3/4 gap-5">
          <Link to={`/blog/${id}`}>
            <div className="flex flex-col gap-2">
              <div className="flex items-center  gap-2">
                {authorImage ? (
                  <img
                    className="w-8 h-8 rounded-full cursor-pointer"
                    src={authorImage}
                    alt="Rounded avatar"
                  />
                ) : (
                  <span className=" flex flex-col items-center justify-center  h-8 w-8 cursor-pointer rounded-full  bg-slate-300  ">
                    <i className="fa-regular fa-user text-lg   font-normal text-gray-600"></i>
                  </span>
                )}
                <div className=" font-semibold cursor-pointer ">{author}</div>
                <div className="text-2xl text-gray-400 relative bottom-1.5">
                  .
                </div>
                <div className="text-gray-400 ">{formattedDate} </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="font-extrabold text-xl  cursor-pointer">
                  {title}
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: sanitizedContent.slice(0, 200) + "...",
                  }}
                  className="font-serif cursor-pointer line-clamp-2"
                />
              </div>
            </div>
          </Link>
          <div className="flex items-center w-full justify-between">
            <div className="flex flex-row items-center gap-3">
              {tagsOnPost.map((tag) => {
                return (
                  <span className="bg-gray-200 px-2 cursor-pointer py-1 rounded-3xl text-sm ">
                    {tag.topic}
                  </span>
                );
              })}
              <span className="text-gray-400 text-sm cursor-pointer">
                {`${Math.ceil(content.length / 100)} min read`}{" "}
              </span>
            </div>
            <span className="flex items-center gap-7 text-gray-400 h-5 relative cursor-pointer">
              {isBookmarked ? (
                <i
                  onClick={() => bookmark(id !== undefined ? id : "")}
                  className="fa-solid fa-bookmark cursor-pointer text-black"
                ></i>
              ) : (
                <i
                  onClick={() => bookmark(id !== undefined ? id : "")}
                  className="fa-regular fa-bookmark cursor-pointer text-gray-500 hover:text-black"
                ></i>
              )}

              <div className="group relative">
                <i
                  onClick={handleMore}
                  className="fa-solid fa-ellipsis cursor-pointer text-gray-500 hover:text-black text-xl"
                ></i>
                <div className="hidden group-hover:block flex-col items-center  bg-black absolute px-3 py-1 text-white bottom-7 right-[-20px] rounded-lg">
                  <span className="absolute  bg-black h-3 w-3 rotate-45 left-6 bottom-[-6px]"></span>
                  more
                </div>
              </div>
              {more && (
                <div className=" flex  bg-slate-200 shadow-md  absolute bottom-7 left-1 text-black  text-sm  rounded-xl  font-semibold  py-2 px-4 ">
                  <span className="absolute  bg-slate-200 h-4 w-4 rotate-45 left-9 bottom-[-10px]"></span>
                  {userAuthor ? (
                    <span className="flex flex-col  gap-2 whitespace-nowrap">
                      <Link to={`/edit-blog/${id}`}>
                        <span>Edit Post</span>
                      </Link>
                      <span onClick={handleDelete}>Delete post</span>
                    </span>
                  ) : (
                    <span
                      onClick={() => followUser(authorId)}
                      className="text-center whitespace-nowrap"
                    >
                      {" "}
                      {isFollowing ? "Unfollow author" : "Follow author"}{" "}
                    </span>
                  )}
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
