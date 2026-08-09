

// controlled component 

import { useRef, useState } from "react";
import { CrossIcon } from "../Icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

type ContentType =   "youtube"| "twitter";


export function CreateContentModal({open,onClose}:any){
   const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type,setType] = useState<ContentType>("youtube");
function addContent(){
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    axios.post(`${BACKEND_URL}/api/v1/content`,{
        link,
        title,
        type
    },{
        headers:{
            "Authorization":localStorage.getItem("token")
        }
    })
}

    return <div className="p-4">
        {open && <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 bg-gray-50 flex justify-center">
          <div className="flex flex-col justify-center">
            <span className="bg-white opacity-100 p-4 rounded"> 
                <div className="flex justify-end">
                    <div onClick={onClose} className="cursor-pointer">
                    <CrossIcon></CrossIcon>
                    </div>
                </div>
                <div>
                    <Input refrences={titleRef} placeholder ="Title"></Input>
                    <Input refrences={linkRef} placeholder ="Link" ></Input>
                </div>
                <h1>Type</h1>
                <div className="flex gap-1 p-4">
                    <Button text="Youtube" variant={type==="youtube"? "primary" :"secondary"} onClick={()=>{setType("youtube")}}></Button>
                    <Button text="Twitter" variant={type==="twitter"? "primary" :"secondary"} onClick={()=>{setType("twitter")}}></Button>
                </div>
                <div className="flex justify-center">
                <Button onClick={addContent} variant="primary" text="Submit" />
                
                </div>
               </span>
            </div>
             </div>}
    </div>
}

