"use client";
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect,useState,useRef } from 'react';
import { FileText } from 'lucide-react';
import Popup from './Popup';
import { useSession } from 'next-auth/react';
export default function Tags() {
  const [loading, setloading] = useState(false);
  const [tags, settags] = useState<{tag:string,documentIds:string[],userId:string}[]>([]);
  const [oldTag, setoldTag] = useState('');
    const [showPopup, setshowPopup] = useState(false);
    const [userId, setuserId] = useState<any>('');
    const [popupType, setpopupType] = useState('');
    const [val, setval] = useState('');
    const [searchVal, setsearchVal] = useState('');
    const [tagupdate, settagupdate] = useState(false);
  const [documents, setdocuments] = useState<{id:string,userId:string,title:string,tags:string[]}[]>([]);
const [selectedTagIds, setselectedTagIds] = useState<string[]>([]);
const [updateTagContent, setupdateTagContent] = useState(false);
const [docId, setdocId] = useState('');
const inputRe = useRef<HTMLInputElement>(null);
const inputRefTag = useRef<HTMLInputElement>(null);
const [mydocs, setmydocs] = useState<{id:string,userId:string,title:string,tags:string[]}[]>([]);
const session = useSession();
useEffect(() => {
if(!session.data?.user)return;
setuserId(session.data.user.id);
const mydoc = documents?.filter(doc=>doc.userId === session.data?.user.id);
setmydocs(mydoc);
console.log()
}, [documents])
useEffect(() => {
 if(!docId || !val || !oldTag || !tagupdate)return;
console.log("reach")
 fetch('/api/tag/update',{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
    body:JSON.stringify({
    documentId:docId,
    tag:oldTag,
    newTag:val
     })
     })
     .then(res=>{
      if(!res.ok){
        settagupdate(false);
        alert("Error while creating tag");
        return;
      }
      return res.json();})
      .then((data:any)=>{
        settagupdate(false);
        alert("Tag updated successfully");
        inputRefTag.current!.value = "";
      }).catch(err=>console.error(err))
}, [oldTag,tagupdate])

useEffect(() => {
 if(!docId || !searchVal)return;

 fetch('/api/tag',{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify({
    documentId:docId,
    tag:searchVal
  })
     })
     .then(res=>{
      if(!res.ok){
        alert("Error while creating tag");
        return;
      }
      return res.json();})
      .then((data:any)=>{
        alert("Tag created successfully");
        setsearchVal('');
      }).catch(err=>console.error(err))
}, [docId])



  function TagsData() {
  return <div className={`bg-white h-4/5 w-4/5  md:h-2/3 md:w-1/3 flex p-3 flex-col rounded-md  gap-5 text-black`}>
    <h2 className="text-black text-center text-xl  font-bold">Selected Tag Documents</h2>
     <div className="space-y-2 overflow-auto h-full">
          {documents.length > 0 && documents?.filter(doc => selectedTagIds.includes(doc?.id))?.map((doc) => (
            <div key={doc?.id} className="flex bg-gray-200  items-center justify-center rounded-lg border border-white/10 p-4 text-black">
              <div className="flex  justify-center items-center gap-3">{<FileText className="h-6 w-6" />}<div><p className="font-medium">{doc?.title}</p></div></div>
              {/* <div className="flex flex-wrap gap-2">{doc?.tags?.map((tag) => (<span key={tag} className="rounded-full text-black text-gray-500 px-2 py-0.5 text-xs">#{tag}</span>))}</div> */}
            </div>
          ))}
        </div>
  </div>
}
 function TagsEdit() {
  return <div className={`bg-white h-4/5 w-4/5  md:h-2/3 md:w-1/3 flex p-3 flex-col rounded-md  gap-5 text-black`}>
    <div className={`h-full ${!updateTagContent ? "block" : "hidden"} w-full flex flex-col gap-5`}>
       <h2 className="text-black text-center text-xl  font-bold">Selected document To update tag</h2>
     <div className="space-y-2 overflow-auto h-full">
          {mydocs.length > 0 && mydocs?.map((doc) => (
            <div key={doc?.id} className={`flex cursor-pointer bg-gray-200 items-center justify-center rounded-lg border border-white/10 p-4 text-black`} onClick={()=>{setdocId(doc.id);setupdateTagContent(true);}}>
              <div className={`flex   justify-center items-center gap-3`} >{<FileText className="h-6 w-6" />}<div><p className="font-medium">{doc?.title}</p></div></div>
            </div>
          ))}
    </div>
    </div>
    <div className={`h-full ${updateTagContent ? "block" : "hidden"} w-full flex-1 flex flex-col gap-5`}>
 <h2 className="text-black text-center text-xl  font-bold">Update Tag</h2>
     <div className="space-y-2 flex-1 flex flex-col gap-5 overflow-auto h-full">
      <Input placeholder='Enter new tag name' ref={inputRefTag} className="" />
      <Button onClick={()=>{settagupdate(true);setshowPopup(false);setval(inputRefTag.current?.value || "");}} className="w-full">Update</Button>
        </div>
    </div>
   
  </div>
}
  function TagCreatedData() {
  return <div className={`bg-white h-4/5 w-4/5  md:h-2/3 md:w-1/3 flex p-3 flex-col rounded-md  gap-5 text-black`}>
    <h2 className="text-black text-center text-xl  font-bold">Selected document To create tag</h2>
     <div className="space-y-2 overflow-auto h-full">
          {mydocs.length > 0 && mydocs?.map((doc) => (
            <div key={doc?.id} className={`flex cursor-pointer bg-gray-200 items-center justify-center rounded-lg border border-white/10 p-4 text-black`} onClick={()=>{setdocId(doc.id);setshowPopup(false);}}>
              <div className={`flex   justify-center items-center gap-3`} >{<FileText className="h-6 w-6" />}<div><p className="font-medium">{doc?.title}</p></div></div>
            </div>
          ))}
        </div>
  </div>
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
    console.log(data);
    const tagsArr:any = [];
 const tags = data?.document?.flatMap((doc:any)=>doc.documents.flatMap((d:any)=>{return {documentId:d.id,tags:d.tags,userId:d.userId}}) || []);
 tags?.map((t:any)=>t.tags.map((tg:any)=>{
  if(tagsArr[tg])
  {
    tagsArr[tg].documentIds.push(t.documentId);
  }
  else
  {
  tagsArr.push({tag:tg,documentIds:[t.documentId],userId:t.userId});
  }
 }))
 const documents = data?.document?.flatMap((doc:any)=>doc.documents.flatMap((d:any)=>{return {id:d.id,title:d.title,userId:d.userId,tags:d.tags}})) || [];
 console.log(documents);
     settags(tagsArr);
     setdocuments(documents);
     setloading(false);
   }).catch(err=>console.error(err)).finally(()=>{setloading(false)})
}, [])

  return (
    <div className={`${showPopup ? "h-screen" : "min-h-screen"} bg-gray-50 px-6 pt-[60px]`}>

        { showPopup && popupType === "tag_view" && <Popup showPopup={showPopup} setshowPopup={setshowPopup} Children={<TagsData />}/> }
        { showPopup && searchVal && popupType === "tag_create" && <Popup showPopup={showPopup} setshowPopup={setshowPopup} Children={<TagCreatedData />}/> }
        { showPopup && popupType === "tag_edit" && <Popup showPopup={showPopup} setshowPopup={setshowPopup} Children={<TagsEdit />}/> }

      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Tags</h1>
        <p className="text-gray-600 mt-1">
          Organize and explore your documents using tags.
        </p>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 mb-8">
        <Input
          placeholder="Search or create tags..."
          className="bg-white border-gray-200"
          value={searchVal}
          onChange={(e)=>{setsearchVal(e.target.value);}}  
          required   
          />
        <Button className='' onClick={()=>{if(!searchVal)return;setshowPopup(true);setpopupType("tag_create")}}>Create Tag</Button>
      </div>

      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading ? <p className="text-gray-500">Loading tags...</p> : tags.length > 0 ? tags?.filter((tag)=>tag.tag.toLowerCase().includes(searchVal.toLowerCase()))?.map((tag) => (
          <Card
            key={tag.tag} 
            className="hover:shadow-md transition bg-white border-gray-200"
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  #{tag.tag}
                </h3>
                <span className="text-sm text-gray-500">
                  {tag.documentIds.length} docs
                </span>
              </div>

              <div className="mt-4 flex gap-2">
                <Button className='cursor-pointer' variant="outline" size="sm" onClick={()=>{setshowPopup(true);setselectedTagIds(tag.documentIds);setpopupType("tag_view")}}>
                  View
                </Button>
                <Button className={`${tag.userId === userId ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`} variant="outline" size="sm" onClick={()=>{setshowPopup(true);setoldTag(tag.tag);setpopupType("tag_edit")}}>
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        )) : <p className="text-gray-500">No tags available</p>}
      </div>
    </div>
  )
}