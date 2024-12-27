import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import TagsInput from "react-tagsinput";
import { Blog } from "../context/Context";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/firebase";
import { v4 } from "uuid";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSingleBlog } from "../hooks/blog";

export const Preview = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  const { pathname } = useLocation();

  type Tag = {
    tagId: string;
  };

  const { id } = useParams();
  const { blog } = useSingleBlog(id || "");
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState<any>("");
  const [imageUrl, setImageUrl] = useState<any>("");
  const imageRef = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const { setPreview } = Blog();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const headers = { Authorization: ` ${localStorage.getItem("token")}` };

  useEffect(() => {
    const fetchBlogAndTags = async () => {
      if (blog !== null) {
        try {
          // Fetch tags for the blog post
          const tagPromises = blog?.tags.map(async (tag: Tag) => {
            const response = await axios.get(
              `${backendUrl}/tag/${tag?.tagId}`,
              { headers }
            );
            return response?.data.topic;
          });

          const tagResults = await Promise.all(tagPromises);
          setTags(tagResults);

          setImageUrl(blog?.img);
          setPreviewImage(blog?.img);
        } catch (error) {
          console.error("Error fetching blog data:", error);
        }
      }
    };

    fetchBlogAndTags();
  }, [blog]);

  const handlePublish = async () => {
    const storageRef = ref(storage, `image/${v4()}`);

    await uploadBytes(storageRef, imageUrl);
    const imageStorageUrl = await getDownloadURL(storageRef);

    const tagsOnPost = tags.map((tag) => {
      return { topic: tag };
    });
    if (pathname.startsWith("/new-story")) {
      try {
        await axios.post(
          `${backendUrl}/blog`,
          {
            title: newStory.title,
            content: newStory.content,
            img: imageStorageUrl,
            published: newStory.published,
            tags: tagsOnPost,
          },
          { headers }
        );
        toast.success(" Post Created Successfully");
        navigate("/blogs");
        window.location.reload();
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    } else {
      try {
        await axios.put(
          `${backendUrl}/blog/${id}`,
          {
            title: newStory.title,
            content: newStory.content,
            img: imageStorageUrl,
            published: newStory.published,
            tags: tagsOnPost,
          },
          { headers }
        );
        toast.success(" Post Updated Successfully");
        navigate("/blogs");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    }
  };
  const uploadImage = () => {
    imageRef.current?.click();
  };
  const [newStory, setNewStory] = useState({
    title: "",
    content: "",
    img: "",
    published: false,
    tags: [],
  });
  useEffect(() => {
    if (title || content) {
      setNewStory((prev) => ({ ...prev, title: title, content: content }));
    }
  }, [title, content]);

  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }], // Add tasklist option
        ["bold", "italic", "underline", "strike"],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ["code-block"],
        ["link", "image", "video"],
        ["clean"],
      ],
    },
  };

  return (
    <div className="md:flex md:gap-10 md:justify-center w-full px-10 pb-10 pt-40 ">
      <Toaster />
      <div className="flex flex-col gap-5 md:w-2/6  w-full">
        <span className="text-lg text-gray-600 font-semibold">
          Story Preview
        </span>
        <div className="flex relative w-full overflow-hidden h-52 bg-gray-100 justify-center items-center">
          <input
            ref={imageRef}
            onChange={(e) => {
              const files = e.target.files;
              if (files && files.length > 0) {
                const file = files[0];
                setPreviewImage(URL.createObjectURL(file));
                setImageUrl(file);
              }
            }}
            type="file"
            hidden
          />

          {previewImage ? (
            <img className="h-52 " src={previewImage} alt="previewImage" />
          ) : (
            <span
              onClick={uploadImage}
              className="text-lg cursor-pointer text-gray-500"
            >
              Add Image
            </span>
          )}
          <i
            onClick={() => setPreviewImage("")}
            className="fa-solid fa-xmark absolute right-5 top-5  text-xl cursor-pointer   text-slate-600"
          ></i>
        </div>
        <div className="flex flex-col gap-1">
          <input
            value={newStory.title}
            onChange={(e) =>
              setNewStory({ ...newStory, title: e.target.value })
            }
            type="text"
            placeholder="Title"
            className="outline-none text-[#232f34] font-serif font-semibold text-lg w-full"
          />
          <ReactQuill
            value={newStory.content}
            onChange={(value) => setNewStory({ ...newStory, content: value })}
            theme="bubble"
            placeholder="Tell your story..."
            className="tracking-wide text-[#0B1215] font-light"
            modules={modules}
          />
        </div>
        <p className="flex flex-wrap w-full">
          <span className="font-semibold ">Note</span> Changes here will affect
          how your story appears in public places like Scribblr's homepage and
          in subscriber's inboxes , not the content of the story itself.
        </p>
      </div>
      <div className="flex flex-col md:w-2/6 w-full mt-10 gap-7 ">
        <div className="text-2xl">
          <span className="text-gray-500 tracking-tight ">Publishing to :</span>{" "}
          <span className="font-semibold"> Sunny</span>
        </div>
        <span>
          Add or change topics up to 5 so readers know what your story is about
        </span>
        <TagsInput value={tags} onChange={setTags} />
        <button
          onClick={handlePublish}
          type="button"
          className="text-white bg-green-700 border border-green-300 focus:outline-none hover:bg-green-600 focus:ring-4 focus:ring-gray-100 font-medium rounded-3xl py-2 w-max px-4  text-base  "
        >
          Publish now
        </button>
      </div>
      <i
        onClick={() => setPreview(false)}
        className="fa-solid fa-xmark absolute top-10 right-20 text-4xl cursor-pointer   text-slate-400"
      ></i>
    </div>
  );
};
