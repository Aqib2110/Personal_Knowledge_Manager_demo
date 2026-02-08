"use client"

import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Folder, Building2 } from "lucide-react"
import Popup from "./Popup";
import { useEffect } from "react";




export default function Workspace() 
{ 
    const [workspaces, setWorkspaces] = useState<any>([])
    const [showPopup, setshowPopup] = useState(false);
    const [show, setshow] = useState("");
    const [workspaceId, setworkspaceId] = useState('');
    const [loading, setloading] = useState(false);

 useEffect(() => {
    setloading(true);
  fetch("/api/workspace")
  .then(res=>{
    if(!res.ok)
    {
        setloading(false);
        alert("Failed to get your Worspaces");
        return;
    }
    return res.json();
  })
  .then(data=>{
    setloading(false);
    setWorkspaces(data.workspaces || []);
    console.log(workspaces);
  }).catch(err=>console.error(err)).finally(()=>{
    setloading(false);
  })
 }, [])
function WorkspacePopupData()
{
return <div className={`bg-white h-4/5 w-4/5 md:h-2/3 md:w-1/3 flex flex-col rounded-md justify-center items-center gap-5 text-black`}>
    <h2 className="text-black text-center text-xl  font-bold">Create Your Workspace</h2>
    <form className="flex flex-col w-full gap-5 justify-center items-center" onSubmit={(e)=>{handleSubmit(e);}}>
    <input type="text" name="workspace" placeholder="Workspace name " className="w-3/4 outline rounded-md px-3 py-1"/>
<input type="submit" className="text-md font-semibold px-8 py-1 cursor-pointer bg-black text-white rounded-md" value={"create"}/>
    </form> 
    </div>
}
function ProjectPopupData()
{
return <div className={`bg-white h-4/5 w-4/5 md:h-2/3 md:w-1/3 flex flex-col rounded-md justify-center items-center gap-5 text-black`}>
    <h2 className="text-black text-center text-xl  font-bold">Create Your Project</h2>
    <form className="flex flex-col w-full gap-5 justify-center items-center" onSubmit={(e)=>{handleSubmit(e);setshowPopup(false);}}>
    <input type="text" name="project" placeholder="project name " className="w-3/4 outline rounded-md px-3 py-1"/>
<input type="submit" className="text-md font-semibold px-8 py-1 cursor-pointer bg-black text-white rounded-md" value={"create"}/>
    </form> 
    </div>
}

const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
e.preventDefault();
const formData = new FormData(e.currentTarget);
const workspace = formData.get("workspace");
const project = formData.get("project");
console.log(workspace,"workspace");
console.log(project,"project");


if(workspace)
{
    console.log("reach")
try {
    const res = await fetch("/api/workspace",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({name:workspace})
})
if(!res.ok)
{
alert("Failed to create workspace")
}
const data = await res.json();
alert(data.message);
} catch (error) {
    alert("Failed to create workspace")
}
}
else{
    console.log("rech")
try {
    const res = await fetch("/api/project",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({name:project,workspaceId:workspaceId})
})
if(!res.ok)
{
alert("Failed to create workspace")
}
const data = await res.json();
alert(data.message);
} catch (error) {
    alert("Failed to create workspace");
}
}
}
if(loading)
{
   return <div className="min-h-screen flex justify-center items-center z-10 pt-[60px] bg-gray-50 p-8"> 
  <div>Loading...</div>
    </div>
}
return ( <div className={`${showPopup ? "h-screen" : "min-h-screen"} z-10 pt-[60px] bg-gray-50 md:p-8 p-3`}> 

<div className=" ">
    <div className="max-w-7xl mx-auto space-y-8">
     <div className="flex flex-col md:flex-row items-center justify-between">
       <div className=""> 
        <h1 className="text-3xl font-bold text-gray-900">Workspaces</h1>
         <p className="text-gray-600 mt-1"> Create and manage your workspaces and projects </p> 
         </div> 
         <Button className="gap-2 cursor-pointer" onClick={()=>{
            setshowPopup(true);
            setshow("workspace");
            }}> <Plus className="w-4 h-4" /> Create Workspace </Button> 
         </div>
{show === "workspace" ? <Popup showPopup={showPopup} setshowPopup={setshowPopup}  Children={<WorkspacePopupData />}/>
 : <Popup showPopup={showPopup} setshowPopup={setshowPopup}  Children={<ProjectPopupData />}/> }

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {workspaces?.length > 0 ? workspaces?.map((workspace:any) => (
        <Card key={workspace?.id} className="hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-600" />
              <CardTitle>{workspace.name}</CardTitle>
            </div>
            <Button variant="outline" size="sm" className="gap-1 cursor-pointer" onClick={()=>{setshowPopup(true);setshow("project");  setworkspaceId(workspace.id.toString())}}>
              <Plus className="w-4 h-4" /> New Project
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {workspace?.projects?.map((project:any) => (
              <div
                key={project?.id}
                className="flex items-center gap-2 rounded-md bg-white border p-3 text-sm text-gray-700"
              >
                <Folder className="w-4 h-4 text-gray-500" />
                {project?.name}
              </div>
            ))}
          </CardContent>
        </Card>
      )) :  <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <Building2 className="w-10 h-10 text-gray-400 mb-4" />
        <h3 className="font-semibold text-lg">No workspace yet</h3>
        <p className="text-gray-500 text-sm mt-1 max-w-sm">
          Create your first workspace to start uploading documents and asking AI questions.
        </p>
        <Button className="mt-4 gap-2">
          <Plus className="w-4 h-4" /> Create Workspace
        </Button>
      </CardContent>
    </Card>}
    </div>

    <Card className="border-dashed hidden">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <Building2 className="w-10 h-10 text-gray-400 mb-4" />
        <h3 className="font-semibold text-lg">No workspace yet</h3>
        <p className="text-gray-500 text-sm mt-1 max-w-sm">
          Create your first workspace to start uploading documents and asking AI questions.
        </p>
        <Button className="mt-4 gap-2">
          <Plus className="w-4 h-4" /> Create Workspace
        </Button>
      </CardContent>
    </Card>
  </div>
</div>
</div>

) }