import { Link, useParams } from "react-router-dom";
import { useSingleBlog } from "../hooks/blog";
import { formatDate } from "../uility/DateFormatter";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import DOMPurify from "dompurify";
import HandsClap from "../../src/assets/hands-clap.jpg";
import HandsClapped2 from "../../src/assets/hands-clapped2.jpg";
import { useBookmark } from "../hooks/bookmark";
import toast from "react-hot-toast";
import { useClap } from "../hooks/clap";
import { useFollowUser } from "../hooks/user";
import Skeleton from "react-loading-skeleton";
import ShareLink from "../components/ShareLink";

const SingleBlog = () => {
  const [more, setMore] = useState(false);
  const [author, setAuthor] = useState("");
  const [userAuthor, setUserAuthor] = useState(false);
  const [authorImage, setAuthorImage] = useState("");
  const { id } = useParams();
  const { blog, loading } = useSingleBlog(id || "");
  const formattedDate = formatDate(blog.publishedDate);
  const sanitizedContent = DOMPurify.sanitize(blog.content);
  const headers = { Authorization: ` ${localStorage.getItem("token")}` };

  const { followUser, isFollowing } = useFollowUser(blog.authorId);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { bookmark, isBookmarked, error } = useBookmark(
    id !== undefined ? id : ""
  );
  const { clap, isClapped } = useClap(id !== undefined ? id : "");

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
    }
  };

  useEffect(() => {
    async function getUser() {
      try {
        const postUser = await axios.get(`${backendUrl}/user/${blog.authorId}`);
        setAuthor(postUser.data.name);
        setAuthorImage(postUser.data.img);
      } catch (error) {
        console.log("error fetching user data", error);
      }
    }

    getUser();
  }, [blog.authorId]);

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong, please try again later");
    }
  }, [error]);

  return (
    <div className="h-screen place-items-center grid">
      <Navbar />
      <div className="md:w-3/5 sm:w-4/5 py-10 h-screen">
        {loading ? (
          <Skeleton height={40} width={400} />
        ) : (
          <div className=" text-5xl font-extrabold pb-7 ">{blog.title} </div>
        )}
        <div className="flex flex-col gap-2">
          {loading ? (
            <div className="flex gap-4 items-center">
              <Skeleton
                style={{ borderRadius: "50%", width: 40, height: 40 }}
              />
              <Skeleton height={25} width={200} />
            </div>
          ) : (
            <div className="flex items-center pb-4  gap-2">
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
          )}
          <div className="flex w-full items-center gap-8">
            {isClapped ? (
              <img
                src={HandsClapped2}
                onClick={() => clap(id !== undefined ? id : "")}
                alt="hands-clap"
                className=" cursor-pointer h-8 transform rotate-45"
              />
            ) : (
              <img
                onClick={() => clap(id !== undefined ? id : "")}
                src={HandsClap}
                alt="hands-clap"
                className=" cursor-pointer h-8 transform -rotate-[-45deg]"
              />
            )}
            <div className="flex items-center gap-8 text-lg ml-auto">
              {isBookmarked ? (
                <i className="fa-solid fa-bookmark cursor-pointer text-black"></i>
              ) : (
                <i
                  onClick={() => bookmark(id !== undefined ? id : "")}
                  className="fa-regular fa-bookmark cursor-pointer text-gray-500 hover:text-black"
                ></i>
              )}
              <ShareLink />
              <i
                onClick={handleMore}
                className="fa-solid fa-ellipsis cursor-pointer text-gray-500 hover:text-black"
              ></i>
              {more && (
                <div className="flex flex-col flex-start gap-3 bg-slate-200 shadow-md  absolute top-[180px] md:right-56 sm:right-1 text-black  text-sm  rounded-xl  font-semibold  py-2 px-4 w-32">
                  <span className="absolute translate-y-10  bg-slate-200 h-5 w-5 rotate-45 left-7  bottom-7 "></span>
                  {userAuthor ? (
                    <>
                      <Link to={`/edit-blog/${id}`}>
                        <span>Edit Post</span>
                      </Link>
                      <span onClick={handleDelete}>Delete post</span>
                    </>
                  ) : (
                    <span onClick={() => followUser(blog.authorId)}>
                      {" "}
                      {isFollowing ? "Unfollow" : "Follow author"}{" "}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          {loading ? (
            <div className="flex flex-col gap-2">
              <Skeleton className="h-8 w-full max-w-[600px] md:max-w-[900px]" />
              <Skeleton className="h-8 w-full max-w-[600px] md:max-w-[900px]" />
              <Skeleton className="h-8 w-full max-w-[600px] md:max-w-[900px]" />
              <Skeleton className="h-8 w-full max-w-[600px] md:max-w-[900px]" />
              <Skeleton className="h-8 w-full max-w-[600px] md:max-w-[900px]" />
              <Skeleton className="h-8 w-full max-w-[600px] md:max-w-[900px]" />
            </div>
          ) : (
            <div className="flex flex-col  gap-1.5">
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizedContent + "...",
                }}
                className="font-serif cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
