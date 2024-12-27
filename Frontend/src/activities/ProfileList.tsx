import { BlogCard } from "../components/BlogCard";
import { Blog } from "../context/Context";

type Bookmark = {
  postId: string;
};
interface Blogs {
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
export const ProfileList = () => {
  const { currentUserdetails, blogs } = Blog();
  const user = currentUserdetails;
  const blogIds = user?.bookmarks.map((bookmark: Bookmark) => bookmark.postId);
  const bookmarkedBlogs = blogs.filter((blog: Blogs) =>
    blogIds.includes(blog.id)
  );

  return (
    <div>
      {bookmarkedBlogs && bookmarkedBlogs.length > 0 ? (
        bookmarkedBlogs.map((blog: Blogs) => (
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
        ))
      ) : (
        <div className="flex pt-10 pl-5 font-medium text-xl">
          You have no List, start bookmarking stories
        </div>
      )}
    </div>
  );
};
