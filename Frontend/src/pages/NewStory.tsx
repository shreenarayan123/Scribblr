import ReactQuill from "react-quill";
import { Navbar } from "../components/Navbar";

import { useEffect, useState } from "react";
import { Preview } from "../components/Preview";
import { Blog } from "../context/Context";

export const NewStory = () => {
  const { currentUser, setBlogContent } = Blog();

  const [title, setTitle] = useState(localStorage.getItem("title") || "");
  const [content, setContent] = useState(
    localStorage.getItem("content") || " "
  );
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (title !== "" && content !== "") {
      setBlogContent(true);
    }
  }, [title, content]);

  useEffect(() => {
    const saveDraft = () => {
      localStorage.setItem(
        "newStory",
        JSON.stringify({ title: title, content: content })
      );
      setSaved(true);
    };
    setTimeout(saveDraft, 5000);
  }, [title, content]);

  const { preview } = Blog();
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

  return preview ? (
    <div className="visible opacity-100 transition-all duration-200">
      {" "}
      <Preview title={title} content={content} />{" "}
    </div>
  ) : (
    <div className="flex flex-col items-center ">
      <Navbar />
      <div className="flex w-4/5 flex-col py-10 gap-5">
        <span>
          Draft in <span className="font-medium">{currentUser?.name}</span>{" "}
          {saved ? "saved" : "saving..."}
        </span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="outline-none text-[#232f34] font-serif text-5xl w-full"
          placeholder="Title"
        />
        <ReactQuill
          value={content}
          onChange={(value) => setContent(value)}
          theme="bubble"
          placeholder="Tell your story..."
          className="tracking-wide text-[#0B1215] font-light"
          modules={modules}
        />
      </div>
    </div>
  );
};
