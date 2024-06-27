
import { Navbar } from "../components/Navbar";
import { useEffect, useRef, useState } from "react";
import { EditProfile } from "../components/EditProfile";
import { ProfileHome } from "../activities/ProfileHome";
import { ProfileAbout } from "../activities/ProfileAbout";
import { ProfileList } from "../activities/ProfileList";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/firebase";




  const activities=[
    {
      name:"Home",
      comp:ProfileHome
    },
    {
      name:"About",
      comp:ProfileAbout
    },
    {
      name:"List",
      comp:ProfileList
    },
  ]
  

export const Profile = () => {
    const [more , setMore] = useState(false);
    const [editModal, setEditModal] = useState(false);
   
    const currentUser = localStorage.getItem("user");   
    const userDetails  = JSON.parse(currentUser || "{}");
  
    
    // useEffect(() => {
    //   const currentUser = localStorage.getItem('user');
    //   const userDetails = JSON.parse(currentUser || '{}');
      
    
    //   async function uploadImage() {
    //     try {
          
    //         const imageUrl = userDetails.img
          
    //       const storageRef = ref(storage, `image/${imageUrl}`); 
    //       await uploadBytes(storageRef,imageUrl);
    //       const imageStorageUrl = await getDownloadURL(storageRef);
    //       console.log(imageStorageUrl, "profile image");
          
    //     } catch (error) {
    //       console.error('Error uploading image:', error);
    //     }
    //   }
  
    //   uploadImage();
    // }, []);
  
  
   const [selectedTag, setSelectedTag] = useState(activities[0]);   
   const navRef = useRef<HTMLDivElement>(null);

  
  return (
    <div className="md:flex flex-col items-center   sm:w-full sm:justify-center">
        <Navbar/> 
    <div className="flex  justify-center w-full ">
      <div className="flex flex-col mt-32  overflow-y-auto  md:w-3/5 sm:w-full sm:px-10">
        <div className="flex   sm:justify-between sm:w-full gap-4">
          <div className="flex  flex-row items-center gap-3">
          <span className="text-5xl font-bold ">{userDetails.name}</span>
          <span className="text-gray-500 pt-5">Followers(4)</span>
          <span className="text-gray-500 pt-5">Followings(4)</span>
          </div>
          <span className="sm:flex items-center cursor-pointer md:hidden">
          <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => setMore(!more)}
                fill="black"
                height="20px"
                width="20px"
                viewBox="0 0 448 512"
              >
                <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
              </svg>
              {more && (
                <div onClick={() => setEditModal(true)}
                  className="flex flex-col justify-center bg-slate-100 shadow-md  absolute right-16
     text-black  text-sm  rounded-xl  font-semibold w-28 h-8  text-center"
                >
                  Edit Profile
                </div>
              )}
          </span>
        </div>
        <div className="flex items-center gap-5 mt-[1rem] border-b border-gray-300">
        <div className="flex flex-center justify-center flex-row gap-5  pt-10  w-[80%]  ">        
      <div ref={navRef} className="flex  items-center gap-10 w-full   overflow-auto scrollbar-hide overflow-y-hidden whitespace-nowrap scroll">        
      {
        activities.map((activity, index)=>{
          const isActive = selectedTag === activity;
          return (
            <div  key={index} onClick={()=>setSelectedTag(activity)} className={`text-base pb-4 group-1  text-slate-900 cursor-pointer ${isActive ? "border-b-2  border-black" : ""}`}>
               {activity.name}
            </div>
  
          )
        })
      }
      </div>      
    </div>
         
          
        </div>
        <div className="flex flex-col  overflow-y-auto scrollbar-hide">
         <selectedTag.comp/> 
        </div>
      </div>
      <div className="md:flex flex-col   md:w-1/5  gap-7 pl-5 w-full overflow-y-hidden py-10  border-l-2  sm:hidden">
        <div className="flex flex-col items-start gap-1 w-full">
          <span className="flex items-center gap-3">


            {
             
              userDetails.img ?
              <img
                src={userDetails.img}
                className="rounded-full cursor-pointer h-14 w-14  bottom-2"
                alt="ProfileImage"
              /> 
              :
              <span className=" flex flex-col pt-3 items-center h-12 w-12 cursor-pointer rounded-full text-center bg-slate-300  ">
                <i className="fa-regular fa-user text-2xl   font-normal text-gray-600"></i>
              </span>

            }
          <span className="text-lg font-semibold">{userDetails.name}</span>
          </span>
          <span className="text-lg font-semibold"></span>
          <span className="from-neutral-400">
            {userDetails.bio}
          </span>
        </div>
        <span onClick={() => setEditModal(true)} className="text-lg text-green-500 cursor-pointer">Edit Profile</span>
        <div className="flex flex-row flex-wrap gap-3 w-full">
          <span className="text-gray-500">Help</span>
          <span className="text-gray-500">Writers</span>
          <span className="text-gray-500">Blog</span>
          <span className="text-gray-500">Privacy</span>
          <span className="text-gray-500">Terms</span>
          <span className="text-gray-500">About</span>
        </div>
      </div>
    </div>
    {editModal && <EditProfile editModal={editModal} setEditModal={setEditModal}/>}
</div>
    
  );
};
 