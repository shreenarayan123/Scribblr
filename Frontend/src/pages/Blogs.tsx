import { useState, useRef } from "react";
import {BlogCard} from "../components/BlogCard"
import {SideBar} from "../components/SideBar"
import {Navbar} from "../components/Navbar"
import { Blog } from "../context/Context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";



interface TagsBarProps{
  tags:Array<string>;
   
}
const TagsBar= ({tags}:TagsBarProps)=>{
  const [selectedTag, setSelectedTag] = useState<string>("For you")

  const navRef = useRef<HTMLDivElement>(null);
  const handleNav = (direction: string) => {
    if (navRef.current) {
      if (direction === 'left') {

        navRef.current.scrollLeft -= 200;
      } else {
        navRef.current.scrollLeft += 200;
      }
    }
  }

  const handleSelectedtag = (tag:string)=>{
    setSelectedTag(tag);
  }
  

  return <div className="flex flex-center justify-center flex-row gap-5  pt-10  w-[80%]  ">

      <i onClick={() => handleNav('left')} className="fa-solid fa-chevron-left  text-xl pt-1  cursor-pointer"></i>
    <div ref={navRef} className="flex  items-center gap-10 w-full border-b border-gray-300  overflow-auto scrollbar-hide overflow-y-hidden whitespace-nowrap scroll">
      
    {
      tags.map((tag, index)=>{
        const isActive = selectedTag === tag;
        return (
          <div  key={index} onClick={()=>handleSelectedtag(tag)} className={`text-base pb-4 group-1  text-slate-500 cursor-pointer ${isActive ? "border-b-2  border-black" : ""}`}>
             {tag}
          </div>

        )
      })
    }
    </div>
    <i onClick={() => handleNav('right')} className="fa-solid fa-chevron-right text-xl pt-2 cursor-pointer"></i>
    
  </div>
}

const Blogs = () => {
  const navigate = useNavigate();
  const {user} = Blog()
  
  if(user === true){
    // const userData = localStorage.getItem('user');
    // const userDetails = JSON.parse(userData);
   toast.success('Welcome  sunny !')
  }else{

    navigate('/signin')
  }
  

  return (
    <div className="md:flex flex-col items-center sm:w-full sm:justify-center ">
      <Navbar/>
   <div className="flex  justify-center gap-5 ">
    <div className="flex flex-col items-center overflow-y-auto scrollbar-hide h-screen md:w-3/5 sm:w-full sm:px-10">
    <TagsBar
    tags={[
       "For you","Following",
    "Artificial Intelligence",  "Software", "engineering","life", "TryNotToCode"
     ]}
    />

    
     
     <BlogCard
     title={"The Eight Subtle Signs that I still have AdHd as an Adult"}
     content={"React.js has become a cornerstone of modern web development, with its unique approach to managing state within components. One common hook, useState, is fundamental but often misused. Understanding and avoiding these common mistakes is crucial for both beginners and experienced developers aiming to create efficient and bug-free application At the beginning of my career as a software developer, and less comments.The reason behind this evolution is that as your experience grows, you need less and less explanations about the how.What remains pretty much constant, independently of your experience level, is the need to have an understanding of the rationale/reasoning behind certain implementation details.Having a strong understanding of the language/technology being used is key, but doesn’t tell you the whole story. Without hints about the intent of the code, things can get blurry real quick.I once joined a really large project where nobody on the team even knew why some areas of the system were there. And that…"}
     publishedDate={"June 6, 2024"}
     authorName={"sunny"}
     tag={"Technology"}
     />
     
     <BlogCard
     title={"The Eight Subtle Signs that I still have AdHd as an Adult"}
     content={"React.js has become a cornerstone of modern web development, with its unique approach to managing state within components. One common hook, useState, is fundamental but often misused. Understanding and avoiding these common mistakes is crucial for both beginners and experienced developers aiming to create efficient and bug-free application At the beginning of my career as a software developer, and less comments.The reason behind this evolution is that as your experience grows, you need less and less explanations about the how.What remains pretty much constant, independently of your experience level, is the need to have an understanding of the rationale/reasoning behind certain implementation details.Having a strong understanding of the language/technology being used is key, but doesn’t tell you the whole story. Without hints about the intent of the code, things can get blurry real quick.I once joined a really large project where nobody on the team even knew why some areas of the system were there. And that…"}
     publishedDate={"June 6, 2024"}
     authorName={"sunny"}
     tag={"Technology"}
     />
     <BlogCard
     title={"The Eight Subtle Signs that I still have AdHd as an Adult"}
     content={"React.js has become a cornerstone of modern web development, with its unique approach to managing state within components. One common hook, useState, is fundamental but often misused. Understanding and avoiding these common mistakes is crucial for both beginners and experienced developers aiming to create efficient and bug-free application At the beginning of my career as a software developer, and less comments.The reason behind this evolution is that as your experience grows, you need less and less explanations about the how.What remains pretty much constant, independently of your experience level, is the need to have an understanding of the rationale/reasoning behind certain implementation details.Having a strong understanding of the language/technology being used is key, but doesn’t tell you the whole story. Without hints about the intent of the code, things can get blurry real quick.I once joined a really large project where nobody on the team even knew why some areas of the system were there. And that…"}
     publishedDate={"June 6, 2024"}
     authorName={"sunny"}
     tag={"Technology"}
     />
     <BlogCard
     title={"The Eight Subtle Signs that I still have AdHd as an Adult"}
     content={"React.js has become a cornerstone of modern web development, with its unique approach to managing state within components. One common hook, useState, is fundamental but often misused. Understanding and avoiding these common mistakes is crucial for both beginners and experienced developers aiming to create efficient and bug-free application At the beginning of my career as a software developer, and less comments.The reason behind this evolution is that as your experience grows, you need less and less explanations about the how.What remains pretty much constant, independently of your experience level, is the need to have an understanding of the rationale/reasoning behind certain implementation details.Having a strong understanding of the language/technology being used is key, but doesn’t tell you the whole story. Without hints about the intent of the code, things can get blurry real quick.I once joined a really large project where nobody on the team even knew why some areas of the system were there. And that…"}
     publishedDate={"June 6, 2024"}
     authorName={"sunny"}
     tag={"Technology"}
     />
     
   </div>
   
   <SideBar
   tags={[
   
    "Artificial Intelligence", "Coding", "Software", "engineering","jobs"
   ]}
   />
   </div>
   </div>
  )
}

export default Blogs
