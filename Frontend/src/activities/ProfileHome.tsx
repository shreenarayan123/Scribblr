import { BlogCard } from "../components/BlogCard";
import { Blog } from "../context/Context";

export const ProfileHome = () => {
  const { currentUserdetails } = Blog();
  const user = currentUserdetails;

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

  return (
    <div>
      {user.posts && user.posts.length > 0 ? (
        user.posts?.map((blog: Blogs) => (
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
          You haven't published any story yet , start writing
        </div>
      )}
    </div>
  );
};
