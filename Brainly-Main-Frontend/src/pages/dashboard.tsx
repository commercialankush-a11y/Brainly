import axios from "axios"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CreateContentModal } from "../components/CreateContentModel"
import { Sidebar } from "../components/SideBar"
import { BACKEND_URL } from "../config"
import { useContent } from "../hooks/useContent"
import { PlusIcon } from "../Icons/PlusIcon"
import { ShareIcon } from "../Icons/ShareIcon"
import { useState } from "react"

export function Dashboard() {
  const [modalOpen,setModalOpen] = useState(false);
  const contents = useContent();
  return <div >
    <Sidebar></Sidebar>
    <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
    <CreateContentModal open={modalOpen} onClose={()=> { setModalOpen(false)}}></CreateContentModal>


    <div className="flex justify-end gap-4">
    <Button onClick={()=>{setModalOpen(true)}} variant="primary" text="Add Content" startIcon={<PlusIcon/>}></Button>
    <Button onClick={ async ()=>{
    const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
        share:true
      },{
        headers:{
          "Authorization":localStorage.getItem("token")
        }
      });
        const shareUrl = `http://localhost:5173/api/v1/brain/share/${response.data.hash}`;
        alert(shareUrl)
    }}variant="secondary" text="Share Brain" startIcon={<ShareIcon></ShareIcon>}></Button>
   </div>
   <div className=" flex gap-4 flex-wrap">
    {contents.map(({type,link,title}) => <Card 
    type={type} 
    title={title}
     link ={link} ></Card>)}
    
    
   </div>
   </div>
 </div>
}


