import { LogoIcon } from "../Icons/Logo";
import { TwitterIcon } from "../Icons/Twitter";
import { YouTubeIcon } from "../Icons/Youtube";
import { SideBarItem } from "./SideBarItem";

export function Sidebar(){

    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
        <div className="flex text-2xl pt-8 items-center ">
           <div className="text-purple-600 pr-2">
           <LogoIcon></LogoIcon>
           </div>
            Brainly
        </div>
        <div className="pt-8 pl-4">
            <SideBarItem text="Twitter" icon={<TwitterIcon></TwitterIcon>}></SideBarItem>
             <SideBarItem text="Youtube" icon={<YouTubeIcon></YouTubeIcon>}></SideBarItem>
        </div>
         </div>
}