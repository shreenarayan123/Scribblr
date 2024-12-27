import { useEffect, useState } from "react";
import axios from "axios";

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
const headers = { Authorization: ` ${localStorage.getItem("token")}` };
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useSingleBlog = (id: string) => {
  const [blog, setBlog] = useState<any>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getSingleBlog = async (id: string) => {
      const res = await axios.get(`${backendUrl}/blog/${id}`, { headers });
      setBlog(res.data);
      setLoading(false);
    };
    getSingleBlog(id);
  }, [id]);
  return { blog, loading };
};

export const useEdit = (blog: BlogProps, id: string) => {
  const [updatedBlog, setUpdatedBlog] = useState<any>({});
  useEffect(() => {
    const getUpdatedBlog = async (blog: BlogProps) => {
      const res = await axios.put(
        `${backendUrl}/blog/${id}`,
        {
          blog,
        },
        { headers }
      );

      setUpdatedBlog(res.data);
    };
    getUpdatedBlog(blog);
  }, [blog]);
  return { updatedBlog };
};
