import { BlogCard } from "../components/BlogCard";
import { SideBar } from "../components/SideBar";
import { Navbar } from "../components/Navbar";
import { Blog } from "../context/Context";
import { TagsBar } from "../components/TagsBar";
import { useEffect, useState } from "react";
import { Search } from "../context/Filter";
import { useCurrentUser } from "../hooks/user";
import axios from "axios";
import "react-loading-skeleton/dist/skeleton.css";
import BlogCardLoader from "../loaders/BlogCardLoader";

interface Following {
  id: string;
  followerId: string;
  followeeId: string;
}
interface Tag {
  id: string;
  topic: string;
}
interface Blog {
  id: string;
  title: string;
  content: string;
  publishedDate: Date;
  updatedAt: Date;
  published: boolean;
  authorId: string;
  img: string;
  tags: tagOnPost[];
  clap: object[];
  bookmarks: object[];
}
type tagOnPost = {
  tagId: string;
};
const Blogs = () => {
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const { blogs, loading } = Blog();
  const { searchBlog, filter } = Search();
  const userDetails = localStorage.getItem("user");
  const userId = JSON.parse(userDetails || "{}").id;
  const { user } = useCurrentUser(userId);
  const headers = { Authorization: ` ${localStorage.getItem("token")}` };
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    let filtered = [...blogs];

    // Apply tag filter
    let tag: Tag;
    const getTag = async () => {
      const allTags = await axios.get(`${backendUrl}/tag/all`, {
        headers,
      });
      tag = allTags.data.find((tag: any) => tag.topic === filter);
    };

    getTag().then(() => {
      if (filter !== "For You") {
        if (filter !== "Following") {
          if (filter !== "Following" && tag?.id) {
            filtered = filtered.filter((blog) => {
              if (!blog?.tags || !Array.isArray(blog.tags)) {
                return false;
              }

              return blog.tags.some((t) => t?.tagId === tag.id);
            });
          }
        } else {
          const followeeIds = user?.following.map(
            (following: Following) => following.followeeId
          );
          filtered = blogs.filter((blog: any) =>
            followeeIds.includes(blog.authorId)
          );
        }
      }
      // Apply search filter
      if (searchBlog) {
        filtered = filtered.filter(
          (blog) =>
            blog.title.toLowerCase().includes(searchBlog.toLowerCase()) ||
            blog.content.toLowerCase().includes(searchBlog.toLowerCase())
        );
      }
      setFilteredBlogs(filtered);
    });
    setFilteredBlogs(filtered);
  }, [filter, searchBlog, blogs]);

  return (
    <div className="md:flex flex-col items-center w-full justify-center ">
      <Navbar />
      <div className="flex w-[90%]  justify-center gap-5 px-5  pb-5">
        <div className="flex flex-col items-center overflow-y-auto scrollbar-hide h-screen md:w-3/5 sm:w-full sm:px-10">
          <TagsBar />

          <div>
            {loading
              ? Array(3)
                  .fill(0)
                  .map((_, i) => <BlogCardLoader key={i} />)
              : filteredBlogs.map((blog: any) => (
                  <BlogCard
                    key={blog.id}
                    id={blog.id}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={blog.publishedDate}
                    updatedAt={blog.updatedAt}
                    published={blog.published}
                    authorId={blog.authorId}
                    img={blog.img}
                    tags={blog.tags}
                    clap={blog.clap}
                    bookmarks={blog.bookmarks}
                  />
                ))}
          </div>
        </div>

        <SideBar />
      </div>
    </div>
  );
};

export default Blogs;
