
import { GetBanner } from "../components/GetBanner"
import { GetNavbar } from "../components/GetNavbar"


export const GetStarted = () =>{
    
    return (
        <div className="flex  flex-col  items-center w-full h-screen overflow-x-auto">
           <GetNavbar/>
           <GetBanner/>
        </div>
    )
}