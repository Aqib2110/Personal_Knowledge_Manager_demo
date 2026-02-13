"use client";
import React, { useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useRef } from 'react';
import { CrossIcon,MenuIcon } from "lucide-react";
const AI = () => {
interface WorkspaceTypes{
  id:string,
  name:string,
  userId:string,
  slug:string,
  projects:[{
    id:string,
    name:string,
    workspaceId:string,
    userId:string,
    documents:[{
      id:string,
      title:string,
      status:string
    }]
  }]
}
interface organizInterface{
  id:string,
  open:boolean
}
  const [organizations, setorganizations] = useState<WorkspaceTypes[]>([])
  const [organiz, setorganiz] = useState<organizInterface[]>([]);
  const [proj, setproj] = useState<organizInterface[]>([]);
  const [doc, setdoc] = useState<any>({ id: 0, open: false });
  const [chats, setchats] = useState<any>([]);
  const [documentId, setdocumentId] = useState('');
  const [loading, setloading] = useState(false);
  const [timer, settimer] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [loadingVal, setloadingVal] = useState('.');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [workspaceId, setworkspaceId] = useState('');
  const [sidebar, setsidebar] = useState(false);
  console.log(chats);
useEffect(() => {
  if (!organizations.length) return;

  setorganiz(
    organizations.map(org => ({
      id: org.id,
      open: false,
    }))
  );

  setproj(
    organizations.flatMap(org =>
      org.projects.map(project => ({
        id: project.id,
        open: false,
      }))
    )
  );
}, [organizations]);

console.log(proj,organiz)
  useEffect(() => {
    if(timer)
    {
    timerRef.current = setInterval(() => {
  setloadingVal(prev=>{
  if(prev.length === 1) return '..';
   if(prev.length === 2) return '...';
   return '.'
  })
  },300)
   }
  return ()=>{
    if(timerRef.current)
    clearInterval(timerRef.current);
     }

  }, [timer])



  useEffect(() => {
   fetch("/api/workspace")
   .then(res=>{
    if(!res.ok)
    {
throw new Error(`HTTP error! ${res.statusText}`)
    }
   return res.json();
  })
   .then((data:any)=>{
     console.log(data,"data")
    setorganizations(data.workspaces);
   })
  }, [])

    useEffect(() => {
if(!documentId)return;
  setloading(true);
   fetch(`/api/documents/${documentId}/chats`)
   .then(res=>{
    if(!res.ok)
      {
    setloading(false);
  throw new Error(`http Error : ${res.statusText}`)
     }
   return res.json();
   })
   .then((data:any)=>{
     setloading(false);
    setchats(data.chats);
   }).finally(()=>{ setloading(false);})
  }, [documentId])

  const handleSend = async () => {
    if (!inputRef.current || !workspaceId || !documentId) return;
    const chatId = crypto.randomUUID();
    setchats((chats: any) => [...chats, { id: chatId, question: inputRef.current?.value }]);
    settimer(true);
    const res = await fetch(`/api/documents/${documentId}/query`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({workspaceId:workspaceId,query:inputRef.current.value})
    });
    if (!res.ok) {
      inputRef.current.value = '';
      settimer(false);
      const Id = crypto.randomUUID();
      setchats((chats: any) => [...chats, { id: Id, error: "true", answer: "query failed" }])
      throw new Error(`HTTP error! Status: ${res.status}`)
    }
    inputRef.current.value = '';
    const data = await res.json();
    settimer(false);
    setchats((chats: any) => [...chats, { id: data.documentId, answer: data.answer }]);
  }
  return (
    <div className='h-screen w-full flex bg-gray-50 pt-[60px]'>
      <div className='flex md:px-3  flex-1 md:py-4 '>

       <div className={`  ${!sidebar ? "w-[8%]" : "w-[80%]"} lg:w-[25%]  md:w-[30%]  md:mt-0 mt-[60px] h-screen md:h-full md:relative fixed top-0 left-0 `}>



 <div className={`w-full h-full  relative  flex flex-col ${sidebar ? "bg-white border-r border-gray-300" : ""}`}>
    {!sidebar ? <MenuIcon size={15} className={`text-black md:hidden  absolute top-1 right-1`} onClick={()=>{setsidebar(true);}}/>

    : <CrossIcon size={15} className={`text-black md:hidden  absolute top-1 right-1 rotate-[45deg]`} onClick={()=>{setsidebar(false);}}/>

}
          <h2 className={`font-bold ${sidebar ? "block" : "hidden"} md:block text-xl`}>Workspaces</h2>
          <div className={`py-3 flex ${sidebar ? "block" : "hidden"} md:block overflow-auto flex-col gap-3 flex-1`}>
            {organizations.map((org) => {
              const currItem = organiz.find(item => item.id === org.id);
              return (
                <ul key={org.id} className='bg-white   text-black border  flex  flex-col rounded-md pl-6 pr-2 py-3'>
                  <li className='list-disc px-2 border rounded-md'>
                    <div className='flex cursor-pointer  justify-between items-center' onClick={() => { setorganiz((orgn) => orgn.map(item => item.id === org.id ? { ...item, open: !item.open } : item)); }}>

                      <div className=' text-black text-md font-semibold'>
                        {org.name}
                      </div>
                      <div className=' text-black '>
                        {currItem?.open ? <ChevronUp size={18} className='' /> : <ChevronDown size={18} className='' />}
                      </div>
                    </div>





                    <div className={`${org.id === currItem?.id && currItem?.open ? "block" : "hidden"}`}>


                      <span className=' text-sm text-gray-700'>Projects</span>
                      <div className=' flex gap-3 flex-col'>
                        {org.projects.map((project) => {
                          const currItem = proj.find(item => item.id === project.id);
                          return (
                            <ul key={project.id} className='flex py-3 px-2 rounded-md border flex-col'>
                              <li className='list-disc'>
                                <div className='flex  cursor-pointer justify-between items-center' onClick={() => { setproj(projec => projec.map(proj => proj?.id === project.id ? { ...proj, open: !proj.open } : proj)) }}>
                                  <div className='text-black text-sm font-semibold'>
                                    {project.name}
                                  </div>
                                  <div className=' text-black '>
                                    {currItem?.open ? <ChevronUp size={18} className='' /> : <ChevronDown size={18} className='' />}
                                  </div>

                                </div>
                              </li>
                              <div className={`${project.id === currItem?.id && currItem?.open ? "block" : "hidden"}`}>


                                <span className=' text-[12px] text-gray-900'>Documents</span>





                                <div className=' flex gap-3 flex-col'>
                                  {project.documents.map((document) => {
                                    return (
                                      <ul key={document.id} className={`flex py-3 px-6 ${document.status === "processing" ? "hidden" : "block"} rounded-md border flex-col`}>
                                        <li className='list-disc'>
                                          <div className='flex cursor-pointer justify-between items-center' onClick={() => { setdoc((docs:any) => { return { id: document.id, open: !docs.open } });setdocumentId(document.id);setworkspaceId(org.id) }}>
                                            <div className=' text-black text-[12px] font-semibold'>
                                              {document.title}
                                            </div>

                                          </div>
                                        </li>
                                      </ul>
                                    )
                                  })}

                                </div>
                              </div>









                            </ul>
                          )
                        })}

                      </div>



                    </div>





                  </li>



                </ul>
              )
            })}

          </div>
        </div>

       </div>

       
        <div className=' flex flex-col  px-3  ml-[5%] md:ml-0 w-full md:flex-1'>
          <div className='border flex-1 flex flex-col gap-2 overflow-auto p-3'>
        
            {loading ? <div className='h-full w-full flex justify-center items-center'>Loading...</div> : chats.length > 0 ? chats.map((chat: any) => {
              return chat.message ? <div className=''>
                <div className='flex justify-start'>
                  <span className='flex gap-2 items-center'>
<span className='rounded-full w-6 h-6 text-sm font-semibold  text-center border'>
{
  chat?.user?.image ? <img src={chat.user.image} alt="user" className='rounded-full w-full h-full object-cover' /> :
  chat?.user?.name ? chat.user.name.slice(0, 2).toUpperCase() : "U"
}
</span>
 <div className='bg-black text-white w-fit p-2 rounded-md'>
 
                  {JSON.parse(chat.message).question}
                </div>
                </span>
                </div>

            
               <div className='flex justify-end'>
                <span className='flex gap-2 items-center'>

            
 <div className='bg-white text-black w-fit p-2 rounded-md'>
                  {JSON.parse(chat.message).answer}
                </div>
<span className='rounded-full w-6 h-6  text-center text-sm font-semibold  border'>AI</span>

                    </span>   
               </div>
               
              </div> : <div className={`${chat.question ? "bg-black border self-start text-white" : "bg-white self-end text-black"} w-fit p-2 rounded-md`}>
                {chat.question || chat.answer}
              </div>
      }) : <div className='h-full w-full flex justify-center items-center'>No chats</div>}
            <div className='flex justify-end'>
              <div className={`bg-white w-[50px] ${timer ? "block" : "hidden"}  px-4  text-2xl text-black`}>
                {loadingVal}
              </div>
            </div>

          </div>

          <div className='p-2 flex justify-center gap-3 items-center'>

            <input type="text" ref={inputRef} placeholder='Ask Your knowledge...' className='w-full px-3 outline py-3 bg-white border rounded-lg' />
            {/* <span className='bg-blue-500 py-3 text-white px-5 cursor-pointer rounded-md' onClick={()=>{
  if(!inputRef?.current)return;
  setchats((chat:any)=>[...chat,inputRef.current?.value])}
  }>send</span> */}
            <span className={`bg-blue-500 py-3 ${loading || timer ? "cursor-not-allowed opacity-50" : "cursor-pointer"} text-white  px-5  rounded-md`} onClick={() => { handleSend() }}>send</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AI
