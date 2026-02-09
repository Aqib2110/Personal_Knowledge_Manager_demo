"use client";

import { useState,useRef, useEffect } from "react";
import { Search, Upload, FileText, FileImage, FileAudio } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Popup from "./Popup";
interface projectInterface{
    id:string,
    name:string,
    projects:[{
       id:string,
      name:string,
      workspaceId:string
    }],
    documents:[{
      id:string,
      title:string,
      tags:string[],
      status:string,
      project:{
      id:string,
      name:string,
      workspaceId:string
      }
    }]
}
export default function LibraryPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [File, setFile] = useState<any>(null);
  const [project, setproject] = useState<projectInterface[]>([]);
  const [workspaceId, setworkspaceId] = useState('');
  const [projectId, setprojectId] = useState('');
  const [selectWorkspace, setselectWorkspace] = useState(true);
  const fileInputRef = useRef<any>(null);
  const [showPopup, setshowPopup] = useState(false);
  const [loading, setloading] = useState(false);
  const [sendNotify, setsendNotify] = useState(false);
  const [documentId, setdocumentId] = useState('');
  const [tags, settags] = useState<string[]>([]);
  const [val, setval] = useState('');
  const [allDocuments, setallDocuments] = useState<{
    id: string;
    title: string;
    tags: string[];
    status: string;
    project: {
        id: string;
        name: string;
        workspaceId:string
    };
}[]>([])
console.log(allDocuments);
useEffect(() => {
 const Documents = project?.flatMap(ws => ws?.documents ?? []) ?? [];
 const tags = Documents?.flatMap(doc => doc?.tags ?? []) ?? [];
 const uniqueTags = Array.from(new Set(tags));
 settags(uniqueTags);
 setallDocuments(Documents);
}, [project])

function ProjectUploadData() {
  return <div className={`bg-white h-4/5 w-4/5 md:h-2/3 md:w-1/3 flex p-3 flex-col rounded-md  gap-5 text-black`}>
  { selectWorkspace ? <div className="flex flex-col gap-5"> <h2 className="text-black text-center text-xl  font-bold">Select Workspace</h2>
    <div className="flex-1 flex flex-col gap-2 overflow-auto">
    {project?.map((workspace)=> {
      return <span key={workspace.id} className="bg-black p-2 rounded-md text-white w-full" onClick={()=>{setworkspaceId(workspace.id);setselectWorkspace(false);}}>
     {workspace.name}
      </span>
    })}
    </div></div> : <div className="flex flex-col gap-5"> <h2 className="text-black text-center text-xl  font-bold">Select Project</h2>
    <div className="flex-1 flex flex-col gap-2 overflow-auto">
    {project?.flatMap(ws=>ws.projects.filter(proj=>proj.workspaceId === workspaceId)?.map((project)=> {
      return <span key={project.id} className="bg-black p-2 rounded-md text-white w-full" onClick={()=>{fileInputRef?.current?.click();setprojectId(project.id);setshowPopup(false);setselectWorkspace(true);}}>
     {project.name}
      </span>
    }))}
    </div></div>
  }
  </div>
}

const handleChange = async(e:any) => {
    e.preventDefault();
    if(!e.target.files.length) return;
    setFile(e.target.files[0]);
}

useEffect(() => {
   setloading(true);
   fetch('/api/document')
   .then(res=>{
    if(!res.ok){
      alert("Error while getting projects");
      setloading(false);
      return;
    }
    return res.json();
   })
   .then((data:any)=>{
     setproject(data?.document || [])
     setloading(false);
   }).catch(err=>console.error(err)).finally(()=>{setloading(false)})
}, [])

useEffect(() => {
   fetch("/api/notification",{
    method:"POST",
   headers:{
    'Content-Type':"application/json"
   },
   body:JSON.stringify({type:"file_uploaded",reach:"global",workspaceId,documentId,title:"File uploaded"})
   })
   .then(res=>{
    if(!res.ok) throw new Error(`http error : ${res.statusText}`)
    return res.json();
   })
   .then(data=>{}).catch(err=>console.error(err));
}, [sendNotify])

useEffect(() => {
    if(!File || !workspaceId || !projectId) return;
    const formData = new FormData();
    formData.append("file",File);
    formData.set("workspaceId",workspaceId);
    formData.set("projectId",projectId);
    fetch("/api/document",{
      method:"POST",
      body:formData
    }).then(res=>{
      if(!res.ok) { alert("File upload failed"); return; }
      return res.json();
    })
    .then(data=>{

      setdocumentId(data.document.id);
      setsendNotify(true);
      alert("File upload successfully");
    }).catch(err=>console.error(err));
}, [File])

const iconForType = (type: string) => {
  switch (type) {
    case "image":
      return <FileImage className="h-6 w-6" />;
    case "audio":
      return <FileAudio className="h-6 w-6" />;
    default:
      return <FileText className="h-6 w-6" />;
  }
};

return (
<div className={`${showPopup ? "h-screen" : "min-h-screen"} pt-[60px] z-10 bg-gray-50 text-white`}>
  { showPopup && <Popup setselectWorkspace={setselectWorkspace} showPopup={showPopup} setshowPopup={setshowPopup} Children={<ProjectUploadData />}/> }
  <div className=" z-20 border-b border-gray-300 border bg-gray-50 backdrop-blur">
    <div className="hidden md:flex  items-center justify-between px-6 py-4">
      <h1 className="text-xl text-black font-semibold">Library</h1>
      <div className="flex justify-between items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-700" />
          <Input placeholder="Search documents..." className="pl-9 bg-white border-white/10 text-gray-700 focus-visible:ring-0" value={val} onChange={(e)=>{setval(e.target.value)}}/>
        </div>
        <Button className="gap-2 cursor-pointer bg-black text-white" onClick={()=>{setshowPopup(true);}}>
          <input type="file" ref={fileInputRef} onChange={handleChange} className="hidden"/>
          <Upload className="h-4 w-4 " /> Upload
        </Button>
      </div>
    </div>
    <div className="flex flex-col md:hidden px-6 py-4">
      <h1 className="text-xl text-black py-2 font-semibold">Library</h1>
      <div className="flex justify-between items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-700" />
          <Input placeholder="Search documents..." className="pl-9 bg-white border-white/10 text-gray-700 focus-visible:ring-0" value={val} onChange={(e)=>{setval(e.target.value)}}/>
        </div>
        <Button className="gap-2 cursor-pointer bg-black text-white" onClick={()=>{setshowPopup(true);}}>
          <input type="file" ref={fileInputRef} onChange={handleChange} className="hidden"/>
          <Upload className="h-4 w-4 " /> Upload
        </Button>
      </div>
    </div>
  </div>
  <div className="flex">
    <aside className="hidden lg:block w-64 border-r border-gray-300 p-6 space-y-6">
      <div>
        <h3 className="mb-3 text-sm text-gray-500 font-semibold ">Projects</h3>
        <ul className="space-y-2 text-sm">
          <li className="text-black">All Documents</li>
          {project.flatMap(ws=>ws?.projects?.map((proj)=>{
            return  <li key={proj.id} className="text-gray-400 hover:text-white cursor-pointer">{proj?.name}</li>
          }))}
        </ul>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-500">Tags</h3>
        <ul className="flex flex-wrap gap-2 text-xs">
          {tags.length > 0 ? tags.map((tag)=>(<li key={tag} className="rounded-full bg-white text-gray-500 px-3 py-1">#{tag}</li>)) : <li className="text-gray-500">No tags available</li>}
        </ul>
      </div>
    </aside>
    <main className="flex-1 p-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-black">{allDocuments.filter(doc => doc.title.toLowerCase().includes(val.toLowerCase())).length} documents</p>
        <div className="flex text-black gap-2">
          <Button variant={view === "grid" ? "default" : "ghost"} size="sm" onClick={() => setView("grid")}>Grid</Button>
          <Button variant={view === "list" ? "default" : "ghost"} size="sm" onClick={() => setView("list")}>List</Button>
        </div>
      </div>
      {view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">



          {allDocuments.filter(doc => doc.title.toLowerCase().includes(val.toLowerCase())).map((doc) => (
           
        <Card
        key={doc?.id}
        className={`bg-white border-gray-100 border hover:bg-white/10 transition`}
      >
        <CardContent className="p-4 space-y-3">
          <div className="flex text-black items-center gap-3">
            {iconForType('')}
            <h3 className="font-medium text-black truncate">
              {doc?.title}
            </h3>
          </div>

          <p className="text-xs text-gray-700">
            Project: {doc?.project?.name || "l"}
          </p>

          <div className="flex flex-wrap gap-2">
            {doc?.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white text-black px-2 py-0.5 text-xs"
              >
                #{tag}
              </span>
            ) )}
          </div>
        </CardContent>
      </Card>
          
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {allDocuments.filter(doc => doc.title.toLowerCase().includes(val.toLowerCase())).map((doc) => (
            <div key={doc.id} className="flex flex-col gap-4 bg-white items-center justify-between rounded-lg border border-white/10 p-4 text-black">
              <div className="flex items-center gap-3">{iconForType('')}<div><p className="font-medium">{doc.title}</p><p className="text-xs text-gray-500">{doc.project?.name}</p></div></div>
              <div className="flex flex-wrap gap-2">{doc.tags.map((tag) => (<span key={tag} className="rounded-full text-gray-500 px-2 py-0.5 text-xs">#{tag}</span>))}</div>
            </div>
          ))}
        </div>
      )}
    </main>
  </div>
</div>
);
}

