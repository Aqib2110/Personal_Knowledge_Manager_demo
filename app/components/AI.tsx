"use client";
import React, { useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useRef } from 'react';
import { CrossIcon,MenuIcon } from "lucide-react";
const organizations = [{
  id: 1,
  name: "Aqib Groups",
  projects: [{
    id: 1,
    name: "UX Design",
    documents: [
      {
        id: 1,
        name: "UX Design",
      },
      {
        id: 2,
        name: "Employment",
      },
      {
        id: 3,
        name: "Notice",
      }
    ]
  },
  {
    id: 2,
    name: "Employment",
    documents: [
      {
        id: 1,
        name: "UX Design",
      },
      {
        id: 2,
        name: "Employment",
      },
      {
        id: 3,
        name: "Notice",
      }
    ]
  },
  {
    id: 3,
    name: "Notice",
    documents: [
      {
        id: 1,
        name: "UX Design",
      },
      {
        id: 2,
        name: "Employment",
      },
      {
        id: 3,
        name: "Notice",
      }
    ]
  }]
},
{
  id: 2,
  name: "Ali Groups",
  projects: [{
    id: 1,
    name: "UX Design",
    documents: [
      {
        id: 1,
        name: "UX Design",
      },
      {
        id: 2,
        name: "Employment",
      },
      {
        id: 3,
        name: "Notice",
      }
    ]
  },
  {
    id: 2,
    name: "Employment",
    documents: [
      {
        id: 1,
        name: "UX Design",
      },
      {
        id: 2,
        name: "Employment",
      },
      {
        id: 3,
        name: "Notice",
      }
    ]
  },
  {
    id: 3,
    name: "Notice",
    documents: [
      {
        id: 1,
        name: "UX Design",
      },
      {
        id: 2,
        name: "Employment",
      },
      {
        id: 3,
        name: "Notice",
      }
    ]
  }]
},
{
  id: 3,
  name: "Asim Groups",
  projects: [{
    id: 1,
    name: "UX Design",
    documents: [
      {
        id: 1,
        name: "UX Design",
      },
      {
        id: 2,
        name: "Employment",
      },
      {
        id: 3,
        name: "Notice",
      }
    ]
  },
  {
    id: 2,
    name: "Employment",
    documents: [
      {
        id: 1,
        name: "UX Design",
      },
      {
        id: 2,
        name: "Employment",
      },
      {
        id: 3,
        name: "Notice",
      }
    ]
  },
  {
    id: 3,
    name: "Notice",
    documents: [
      {
        id: 1,
        name: "UX Design",
      },
      {
        id: 2,
        name: "Employment",
      },
      {
        id: 3,
        name: "Notice",
      }
    ]
  }]
}
]
const AI = () => {

  // const [organiz, setorganiz] = useState({id:0,open:false});
  const [organiz, setorganiz] = useState(organizations.map((org) => { return { id: org.id, open: false } }));
  const [proj, setproj] = useState(organizations.flatMap(org => org.projects.map(proj => { return { id: proj.id, open: false } })));
  const [doc, setdoc] = useState({ id: 0, open: false });
  const [chats, setchats] = useState<any>([]);
  const [documentId, setdocumentId] = useState<string>('1');
  const [organization, setorganization] = useState<any>([]);
  const [timer, settimer] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [loadingVal, setloadingVal] = useState('.');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [sidebar, setsidebar] = useState(false);


  // useEffect(() => {
  //   if(timer)
  //   {
  //   timerRef.current = setInterval(() => {
  // setloadingVal(prev=>{
  // if(prev.length === 1) return '..';
  //  if(prev.length === 2) return '...';
  //  return '.'
  // })
  // },300)
  //  }
  // return ()=>{
  //   if(timerRef.current)
  //   clearInterval(timerRef.current);
  //    }

  // }, [timer])



  // useEffect(() => {
  //  fetch("/api/workspace")
  //  .then(res=>res.json())
  //  .then(data=>{
  //   if(!data.success)
  //   {
  //    alert("error while getting workspaces");
  //    return;
  //   }
  //   setorganization(data.workspaces);
  //  })
  // }, [])

  //   useEffect(() => {
  //  fetch(`/api/documents/${documentId}/chats`)
  //  .then(res=>{
  //   if(!res.ok)
  //     {
  //   throw new Error(`HTTP error! Status: ${res.status}`)
  //    }
  //  return res.json();
  //  })
  //  .then((data:any)=>{
  //   setchats(data.chats);
  //  })
  // }, [documentId])

  const handleSend = async (id: string) => {
    if (!inputRef.current) return;
    const chatId = crypto.randomUUID();
    setchats((chats: any) => [...chats, { id: chatId, question: inputRef.current?.value }]);
    settimer(true);
    const res = await fetch(`/api/documents/${id}/query`);
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

       <div className={`border ${!sidebar ? "w-[8%]" : "w-[80%]"} lg:w-[25%]  md:w-[30%]  md:mt-0 mt-[60px] h-screen md:h-full md:relative fixed top-0 left-0 `}>



 <div className='w-full h-full bg-white relative border-r flex flex-col border-gray-300'>
    {!sidebar ? <MenuIcon size={15} className={`text-black md:hidden  absolute top-1 right-1`} onClick={()=>{setsidebar(true);}}/>

    : <CrossIcon size={15} className={`text-black md:hidden  absolute top-1 right-1 rotate-[45deg]`} onClick={()=>{setsidebar(false);}}/>

}
          <h2 className={`font-bold ${sidebar ? "block" : "hidden"} md:block text-xl`}>Workspaces</h2>
          <div className={`py-3 flex ${sidebar ? "block" : "hidden"} md:block overflow-auto flex-col gap-3 flex-1`}>
            {organizations.map((org) => {
              const currItem = organiz.find(item => item.id === org.id);
              return (
                <ul className='bg-white   text-black border  flex  flex-col rounded-md pl-6 pr-2 py-3'>
                  <li className='list-disc px-2 border rounded-md'>
                    <div className='flex cursor-pointer  justify-between items-center' onClick={() => { setorganiz((orgn) => orgn.map(item => item.id === org.id ? { ...item, open: !item.open } : item)) }}>

                      {/* <div className='flex border justify-between items-center' onClick={() => { setorganiz((orgn)=>{return {id:org.id,open:!orgn.open}}); }}> */}
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
                            <ul className='flex py-3 px-2 rounded-md border flex-col'>
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
                                      <ul className='flex py-3 px-6 rounded-md border flex-col'>
                                        <li className='list-disc'>
                                          <div className='flex cursor-pointer justify-between items-center' onClick={() => { setdoc((docs) => { return { id: document.id, open: !docs.open } }) }}>
                                            <div className=' text-black text-[12px] font-semibold' onClick={() => { setdocumentId(document.id.toString()) }}>
                                              {document.name}
                                            </div>
                                            {/* <div className=' text-black '>
            
<ChevronDown size={18} className='' />

          </div> */}

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

       
        <div className=' flex flex-col  px-3  ml-[8%] md:ml-0 w-full md:flex-1'>
          <div className='border flex-1 flex flex-col gap-2 overflow-auto p-3'>
            {chats.map((chat: any) => {
              return chat.message ? <div className=''>
                <div className='bg-black text-white w-fit p-2 rounded-md'>
                  {JSON.parse(chat.message).question}
                </div>
                <div className='bg-white text-black w-fit p-2 rounded-md'>
                  {JSON.parse(chat.message).answer}
                </div>
              </div> : <div className={`${chat.question ? "bg-black self-start text-white" : "bg-white self-end text-black"} w-fit p-2 rounded-md`}>
                {chat.question || chat.answer}
              </div>
            })}
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
            <span className='bg-blue-500 py-3 text-white px-5 cursor-pointer rounded-md' onClick={() => { handleSend('1') }}>send</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AI
