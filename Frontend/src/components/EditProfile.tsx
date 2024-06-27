import { Modal } from "../uility/Modal";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Toaster, toast } from "react-hot-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/firebase";
import { v4 } from 'uuid';


interface ModalProps {
  editModal: boolean;
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditProfile = ({ editModal, setEditModal }: ModalProps) => {
  
  const [imageUrl, setImageUrl] = useState<any>("");
  const userDetails = localStorage.getItem("user");
  
  const userName  = JSON.parse(userDetails || "{}").name;
  const userBio  = JSON.parse(userDetails || "{}").bio;
  
  const [formData, setFormData] = useState<any>({
    img:"",
    name:"",
    bio:""
  })
  const imgRef = useRef<HTMLImageElement>(null);
  const openFile = () => {
    const fileInput = document.getElementById(
      "fileInput"
    ) as HTMLInputElement | null;

    if (fileInput) {
      fileInput.click(); // Trigger the click event on the input element     
    } 
  };

  async function handleUserUpdate () {
    
    if(formData.img && !formData.name  || !formData.bio){
      setFormData({
        ...formData,
        name:userName,
        bio:userBio
      })
    }
    
  const userDetails = localStorage.getItem("user");
  const userId = JSON.parse(userDetails || "{}").id
  if(formData.img || formData.name || formData.bio){
    
    
    try{
     
      
      const file = imageUrl;
  const storageRef = ref(storage, `images/${v4()}`);
  const metadata = {
    contentType:'image/png',
  };
  
  const blob2 =  new Blob([file], { type: file.type });
  
  const resultImage =  await uploadBytes(storageRef, blob2, metadata);
    
      const imageStorageUrl = await getDownloadURL(storageRef);
      
      const res = await axios.put(`${BACKEND_URL}/user/${userId}`,{
        name: formData.name || userName,
        bio: formData.bio || userBio,
        img:imageStorageUrl
      })
      
      localStorage.setItem("user",JSON.stringify(res.data))
      toast.success("Profile updated successfully")
      setEditModal(false);
      
      
    }catch(err){
      console.log(err)
      toast.error("Internal server error")
    }
  }else{
    toast.error("Please update atleast one field")
  }
  
}


  return (
    <Modal modal={editModal} setModal={setEditModal}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col gap-6 absolute top-28 z-20  md:left-[30%] sm:left-10 bg-white shadow-2xl p-10">
        <span className="text-3xl font-bold">Profile information</span>
        <div className="flex items-center gap-5">
          <div className="flex flex-col gap-3">
            <span className="text-base text-gray-500">Photo</span>
            {imageUrl ? (
              <>
                <img
                  ref={imgRef}
                  src={imageUrl}
                  className="rounded-[50%] cursor-pointer h-14 w-14  bottom-2"
                  alt="ProfileImage"
                />
                <input
                  type="file"
                  hidden
                  id="fileInput"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      console.log(e.target.files[0],"image url")
                     
                      setImageUrl(e.target.files[0]);
                      setFormData({...formData, img:(e.target.files[0])})
                      // setImageUrl(URL.createObjectURL(e.target.files[0]));
                      // setFormData({...formData, img:URL.createObjectURL(e.target.files[0])})
                    }
                  }}
                  accept="image/jpg, image/png, image/jpeg"
                />
              </>
            ) : (
              <>
              <span className=" flex flex-col pt-2 items-center h-9 w-9 cursor-pointer rounded-full text-center bg-slate-300  ">
                <i className="fa-regular fa-user text-xl   font-normal text-gray-600"></i>
              </span>
              <input
              type="file"
              hidden
              id="fileInput"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setImageUrl(URL.createObjectURL(e.target.files[0]));
                  setFormData({...formData, img:URL.createObjectURL(e.target.files[0])})
                }
              }}
              accept="image/jpg, image/png, image/jpeg"
            />
            </>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <span
                onClick={openFile}
                className="text-blue-500 cursor-pointer"
              >
                Update
              </span>
              <span className="text-red-500 cursor-pointer"onClick={()=>{setImageUrl("")} }>Remove</span>
            </div>
            <span className="text-gray-500 text-wrap">
              Recommended :Square PDG, PNG, or GIF, at least 1,000 pixels per
              side
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-base">Name*</span>
          <div className="flex">
            <div className="relative w-full">
              <input
              maxLength={50}
                onChange={(e)=>setFormData({...formData, name: e.target.value})}
                type="name"
                className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-black focus:ring-black disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              />
              <span className="absolute right-5">{formData.name.length}/50</span>
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-base">Short bio</span>
          <div className="flex">
            <div className="w-full " >
              <textarea onChange={(e)=>setFormData({...formData, bio: e.target.value})} maxLength={100} className="py-3 px-4 block bg-gray-100 w-full border-gray-200 rounded-lg text-sm focus:border-black focus:ring-black disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"></textarea>
              <span className="absolute right-14">{formData.bio.length}/100</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-5 mt-3">
          <button
          onClick={()=>setEditModal(false)}
            type="button"
            className=" text-blue-500 bg-white border border-blue-500 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full h-10 px-6 text-base   hover:text-blue-800 dark:focus:ring-gray-700"
          >
            Cancel
          </button>
          <button
          disabled={ !imageUrl && !( formData.name.length && formData.bio.length)}
          onClick={handleUserUpdate}
            type="button"
            className= {`text-white bg-green-900 border border-gray-200 focus:outline-none  ${ !imageUrl && !( formData.name.length && formData.bio.length) ? 'text-blue-300 border-gray-300 bg-blue-100 ' : ''} 
              focus:ring-4 focus:ring-gray-100 font-medium rounded-full h-10 px-6 text-base `}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};


