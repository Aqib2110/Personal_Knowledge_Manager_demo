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
import { CrossIcon,MenuIcon } from "lucide-react";
import { useState } from "react";

const workspaces = [
  { id: "1", name: "Product Team" },
  { id: "2", name: "Marketing" },
  { id: "3", name: "Client Docs" },
]

const members = [
  { name: "Muhammad Aqueel", email: "aqueel@mail.com", role: "Admin" },
  { name: "Sarah Khan", email: "sarah@mail.com", role: "Editor" },
  { name: "John Doe", email: "john@mail.com", role: "Viewer" },
]

export default function Roles() {
    const [sidebar, setsidebar] = useState(false);

  return (
    <div className="flex overflow-auto pt-[60px] border min-h-screen bg-gray-50">
      <div className="h-full flex  w-full">

   

 <aside className={`${sidebar ? "w-[80%]" : "w-[8%]"}  h-screen md:w-[30%] lg:w-[25%]  fixed md:relative mt-[60px] md:mt-0 z-10 md:z-0 top-0 left-0 border-r   border-gray-200 bg-white`}> 
 {sidebar ?  <CrossIcon size={15} className="text-black block md:hidden absolute rotate-[45deg] top-3 right-3" onClick={()=>{setsidebar(false);}}/>
  : <MenuIcon size={15} className="text-black block md:hidden absolute top-3 right-1" onClick={()=>{setsidebar(true);}} />}
    <div className={`p-5 ${sidebar ? "block" : "hidden"} md:block border-b border-gray-200`}> 
        <h2 className="font-semibold text-gray-900">Workspaces</h2>       
        </div>
         <div className={`${sidebar ? "block" : "hidden"} md:block space-y-1`}>
          {workspaces.map(ws => (
            <button
              key={ws.id}
              className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium hover:bg-gray-100 bg-gray-100"
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
            <Input placeholder="email@example.com" />
            
            <Select>
              <SelectTrigger className="md:w-40 w-full">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>

            <Button>Send Invite</Button>
          </div>
        </div>

        <div className="rounded-xl border w-full bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Members</h3>

          <div className="divide-y border">
            {members.map(member => (
              <div
                key={member.email}
                className="flex flex-col gap-3 md:gap-0 md:flex-row items-center justify-between py-4"
              >
                <div className="flex border w-full md:w-auto items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {member.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.email}</p>
                  </div>
                </div>

                <Select defaultValue={member.role.toLowerCase()}>
                  <SelectTrigger className="md:w-32 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
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