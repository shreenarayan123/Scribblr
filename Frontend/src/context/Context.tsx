
import { createContext, useContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

type BlogContextType = {
  user: boolean; 
  setUser: React.Dispatch<React.SetStateAction<boolean>>
  users:Users[];
};

const defaultValue: BlogContextType = {
  user: false,
  setUser: () => {} ,// Dummy implementation
  users:[]
};

const BlogContext = createContext<BlogContextType>(defaultValue);

type ContextProps = {
  children: React.ReactNode;
};
interface Users{
  id:string
}

export const Context = ({ children }: ContextProps) => {
  const [user, setUser] = useState(false);
  const [users, setUsers] = useState<Users[]>([]);

  
  

  useEffect(() => {
    const userDetails = localStorage.getItem("user");

    if (userDetails !== null) {
      const parsedUserDetails = JSON.parse(userDetails);
      setUser(!!parsedUserDetails); 
    } else {
      setUser(false); 
    }
  }, []); 
  useEffect(()=>{
    async function GetAll (){
      const {data} = await axios.get(`${BACKEND_URL}/user/all`);

      setUsers(data.users);
    }
    GetAll()
  },[])
  
  return (
    <BlogContext.Provider value={{ user, setUser,users }}>
      {children}
    </BlogContext.Provider>
  );
};

export const Blog = () => useContext(BlogContext);
