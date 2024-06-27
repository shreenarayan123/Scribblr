import { useState } from "react";
import UserModal from "./UserModal"
import Logo from '../assets/logo.png'
import {Link } from 'react-router-dom'






export const Navbar=()=>{

    const [showUser, setShowUser] = useState(false);
    const currentUser = localStorage.getItem("user");
    
  const userDetails  = JSON.parse(currentUser || "{}");


    return <div className="flex flex-col w-full sticky top-0 bg-white">
        <div className='flex justify-between w-full  py-4 px-8 ' >
        <div className="flex items-center gap-5">
        <Link to={"/blogs"}>
        <img src={Logo} alt="logoImage" className='h-12' />
        </Link>

            <form className="max-w-md mx-auto">   
    <label  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search"  className="block w-full px-4 py-3 ps-10 text-sm text-gray-900 border border-none rounded-full bg-gray-100 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400  dark:focus:border-blue-500" placeholder="Search Blogs , stories....." required />
    </div>
</form>

            

        </div>
        <div className="flex items-center gap-4">
        <div className="flex gap-4">
          <Link to={'/new-story'}>
          <span className="flex items-center gap-4 text-2xl font-normal cursor-pointer text-gray-600">            
          <i className="fa-regular fa-pen-to-square"></i>          
          </span>
          </Link>
          <span className="flex items-center gap-4 text-lg font-normal text-gray-600">            
          Write          
          </span>
        </div>
                {
              userDetails.img ?
              <img
              onClick={() => setShowUser(!showUser)}
                src={userDetails.img}
                className="rounded-full cursor-pointer h-12 w-12  bottom-2"
                alt="ProfileImage"
              /> 
              :
              <span onClick={() => setShowUser(!showUser)} className=" flex flex-col pt-3 items-center h-12 w-12 cursor-pointer rounded-full text-center bg-slate-300  ">
                <i className="fa-regular fa-user text-2xl   font-normal text-gray-600"></i>
              </span>

            }
        </div>

    </div>
      <hr />
      {showUser &&
        <UserModal/>
      }
    </div>
}