"use client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CrossIcon, MenuIcon } from "lucide-react";
import { useState, useEffect,useRef } from "react";
import Popup from "./Popup";
const workspaces = [
  { id: "1", name: "Product Team" },
  { id: "2", name: "Marketing" },
  { id: "3", name: "Client Docs" },
]



interface membersInterface{
id: string,
name: string,
role: string,
email: string
}
export default function Roles() {
  const [sidebar, setsidebar] = useState(false);
  const [workspaces, setworkspaces] = useState<{ id: string, name: string, userId: string, members: [{ id: string, name: string, role: string,email:string }] }[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputRef1 = useRef<HTMLInputElement | null>(null);
  const [updateRole, setupdateRole] = useState(false);
  const [showPopup, setshowPopup] = useState(false);
const [userRole, setuserRole] = useState('');
  const [workspaceId, setworkspaceId] = useState('');
  const [role, setrole] = useState('');
  const [loading, setloading] = useState(false);
  const [member, setmember] = useState<membersInterface[]>([]);
  const [memberId, setmemberId] = useState('');
  const [roleOwn, setroleOwn] = useState('');
  function PopupData()
{
  return <div className={`bg-white h-4/5 w-4/5 md:h-2/3 md:w-2/3  flex flex-col rounded-md justify-center items-center gap-5 text-black`}>
      <div className="flex flex-col gap-3 items-center justify-center">
        <h2 className="text-black text-center font-semibold text-xl">Are You Sure </h2>
        <div className="flex jutify-center items-center gap-5">
 <button className="bg-green-500  py-1 text-center w-20 rounded-md cursor-pointer" onClick={()=>{setupdateRole(true);setshowPopup(false);}}>Yes</button>
  <button className="bg-red-500 text-center  w-20 py-1 rounded-md cursor-pointer" onClick={()=>{setshowPopup(false);}}>Cancel</button>
        </div>
       
      </div>
    </div>
} 
useEffect(() => {
 if(!updateRole || !userRole )return;
  fetch("/api/role",{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify({memberId,workspaceId,role:userRole})
 })
 .then(res=>{
 if(!res.ok){
  throw new Error(`http Error : ${res.statusText}`)
 }
 return res.json();
 })
 .then(data=>{
 if(data.message)
 {


fetch("/api/notification",{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify({type:"role_updated",roleOwn,reach:"global",memberId,workspaceId,title:"member role updated"})
 })
 .then(res=>{
  if(!res.ok)
  {
  throw new Error(`http Error : ${res.statusText}`)
  }
  return res.json();
 })
.then(data=>{
 if(data.message){
console.log('role updated notification created successfully')
}
})
 alert('role updated successfully');
 }
 })

}, [updateRole])

  useEffect(() => {
    fetch("/api/workspace")
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! ${res.statusText}`)
        }
        return res.json();
      })
      .then((data: any) => {
        console.log(data, "data")
        setworkspaces(data.workspaces);
      })
  }, [])
  const handleClick = async ()=>{
    if(!inputRef?.current?.value || !workspaceId || !role )return;
        console.log(inputRef?.current?.value,workspaceId,role,"role");

 const res = await fetch("/api/workspace/member",{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify({name:'Ali',email:inputRef?.current?.value,workspaceId,role})
 })
 if(!res.ok){
  throw new Error(`http Error : ${res.statusText}`)
 }
 const data = await res.json();
 if(data.message){
  alert('member added successfully')
 }
const res2 = await fetch("/api/notification",{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify({type:"member_notification",reach:"global",workspaceId,title:"memmber added"})
 })
 if(!res.ok){
  throw new Error(`http Error : ${res.statusText}`)
 }
 const data2 = await res.json();
 if(data.message){
  alert('member added successfully')
 }

  }
  return (
    <div className={`flex overflow-auto pt-[60px] border ${userRole ? "h-screen" : "min-h-screen"} bg-gray-50`}>
      <div className="h-full flex w-full">

{userRole && <Popup showPopup={showPopup} setshowPopup={setshowPopup} Children={<PopupData />} /> }

        <aside className={`${sidebar ? "w-[80%] border-r   border-gray-200 bg-white" : "w-[8%]"}  h-screen md:w-[30%] lg:w-[25%]  fixed md:relative mt-[60px] md:mt-0 z-10 md:z-0 top-0 left-0 `}>
          {sidebar ? <CrossIcon size={15} className="text-black block md:hidden absolute rotate-[45deg] top-3 right-3" onClick={() => { setsidebar(false); }} />
            : <MenuIcon size={15} className={`text-black block ${userRole ? "hidden" : "md:hidden"} absolute top-3 right-1`} onClick={() => { setsidebar(true); }} />}
          <div className={`p-5 ${sidebar ? "block" : "hidden"} md:block border-b border-gray-200`}>
            <h2 className="font-semibold text-gray-900">Workspaces</h2>
          </div>
          <div className={`${sidebar ? "block" : "hidden"} p-2 md:block space-y-1`}>
            {workspaces.map(ws => (
              <button
                key={ws.id}
                className={`w-full rounded-lg cursor-pointer px-3 py-2 text-left text-sm font-medium hover:bg-gray-100 ${workspaceId === ws.id ? "bg-gray-100" : ""}`}
                onClick={()=>{setworkspaceId(ws.id);setmember(ws.members);}}
              >
                {ws.name}
              </button>
            ))}
          </div> </aside>





        {/* <aside className="w-[40%] md:w-[30%] lg:w-[25%] border-r bg-white p-4">
        <h2 className="mb-4 text-sm font-semibold text-gray-500">
          Workspaces
        </h2>

        <div className="space-y-1">
          {workspaces.map(ws => (
            <button
              key={ws.id}
              className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium hover:bg-gray-100 bg-gray-100"
            >
              {ws.name}
            </button>
          ))}
        </div>
      </aside> */}

        <main className="pl-[10%] md:pl-8   w-full md:w-[80%] border  p-8 space-y-8">

          <div>
            <h1 className="text-2xl font-semibold">Product Team</h1>
            <p className="text-sm text-gray-500">
              Manage members and their roles in this workspace
            </p>
          </div>

          <div className="rounded-xl w-full bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">Invite Members</h3>

            <div className="flex md:flex-row flex-col gap-3">
              <Input ref={inputRef} placeholder="email@example.com" />

              <Select onValueChange={(value:any)=>setrole(value)}>
                <SelectTrigger className="md:w-40 w-full">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>

              <Button className="cursor-pointer" onClick={handleClick}>Send Invite</Button>
            </div>
          </div>

          <div className="rounded-xl border w-full bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">Members</h3>

            <div className="divide-y ">
              {member?.length > 0 ? member.map((mem)=>
                <div
                  key={mem.email}
                  className="flex flex-col gap-3 md:gap-0 md:flex-row items-center justify-between py-4"
                >
                  <div className="flex  w-full md:w-auto items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {mem.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="text-sm font-medium">{mem.name}</p>
                      <p className="text-xs text-gray-500">{mem.email}</p>
                    </div>
                  </div>

                  <Select onValueChange={(value:any)=>{setuserRole(value);setshowPopup(true);setmemberId(mem.id);setroleOwn(mem.name)}}>
                    <SelectTrigger className="md:w-32 w-full">
                      <SelectValue placeholder={mem.role || "Role"}/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ) : <div className="text-black">No members</div>}
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">Roles & Permissions</h3>

            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <strong>Admin:</strong> Manage workspace, members, billing, and documents
              </li>
              <li>
                <strong>Editor:</strong> Upload documents, organize content, ask AI questions
              </li>
              <li>
                <strong>Viewer:</strong> Ask AI questions only
              </li>
            </ul>
          </div>

        </main>
      </div>

    </div>
  )
}