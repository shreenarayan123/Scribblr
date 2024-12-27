import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

type BlogContextType = {
  user: boolean;
  setUser: React.Dispatch<React.SetStateAction<boolean>>;
  users: Users[];
  preview: boolean;
  setPreview: React.Dispatch<React.SetStateAction<boolean>>;
  blogs: Blogs[];
  setBlogs: React.Dispatch<React.SetStateAction<any>>;
  blogContent: boolean;
  setBlogContent: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: any;
  currentUserdetails: any;
  setCurrentUserDetails: React.Dispatch<React.SetStateAction<any>>;
  loading?: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  editModal?: boolean;
  setEditModal?: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultValue: BlogContextType = {
  user: false,
  setUser: () => {}, // Dummy implementation
  users: [],
  preview: false,
  setPreview: () => {},
  blogs: [],
  setBlogs: () => {},
  blogContent: false,
  setBlogContent: () => {},
  currentUser: {},
  currentUserdetails: {},
  setCurrentUserDetails: () => {},
  loading: true,
  setLoading: () => {},
  editModal: false,
  setEditModal: () => {},
};

const BlogContext = createContext<BlogContextType>(defaultValue);

type ContextProps = {
  children: React.ReactNode;
};
interface Users {
  id: string;
}
export interface Blogs {
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
export type tagOnPost = {
  id: string;
  tagId: string;
  postid: string;
};

export const Context = ({ children }: ContextProps) => {
  const [user, setUser] = useState(false);
  const [users, setUsers] = useState<Users[]>([]);
  const [preview, setPreview] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [blogContent, setBlogContent] = useState(false);
  const [currentUserdetails, setCurrentUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const userDetails = localStorage.getItem("user");
  const currentUser = JSON.parse(userDetails || "{}");

  useEffect(() => {
    if (userDetails !== null) {
      const parsedUserDetails = JSON.parse(userDetails);
      setUser(!!parsedUserDetails);
    } else {
      setUser(false);
    }
  }, []);

  //Get All Users
  useEffect(() => {
    async function GetAll() {
      const { data } = await axios.get(`${backendUrl}/user/all`);

      setUsers(data.users);
    }
    GetAll();
  }, []);
  useEffect(() => {
    const headers = { Authorization: ` ${localStorage.getItem("token")}` };
    async function GetAll() {
      const { data } = await axios.get(`${backendUrl}/blog/all`, { headers });

      setBlogs(data);
      setLoading(false);
    }
    GetAll();
  }, []);

  return (
    <BlogContext.Provider
      value={{
        user,
        setUser,
        users,
        preview,
        setPreview,
        blogs,
        setBlogs,
        blogContent,
        setBlogContent,
        currentUser,
        currentUserdetails,
        setCurrentUserDetails,
        loading,
        setLoading,
        editModal,
        setEditModal,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const Blog = () => useContext(BlogContext);
