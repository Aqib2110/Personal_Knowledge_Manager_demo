"use client";
import React, { useEffect } from 'react'
import { ChevronDown,ChevronUp } from 'lucide-react';
import { useState,useRef } from 'react';
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
  const [organiz, setorganiz] = useState(organizations.map((org)=>{return {id:org.id,open:false}}));
  const [proj, setproj] = useState(organizations.flatMap(org=>org.projects.map(proj=>{return {id:proj.id,open:false}})));
  const [doc, setdoc] = useState({id:0,open:false});
  const [chats, setchats] = useState<any>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [loadingVal, setloadingVal] = useState('.');
  useEffect(() => {
  const interval = setInterval(() => {
  setloadingVal(prev=>{
  if(prev.length === 1) return '..';
   if(prev.length === 2) return '...';
   return '.'
  })
  },300)
  return ()=>{clearInterval(interval);}
  }, [])
  
  return (
    <div className='h-screen w-full flex bg-gray-50 pt-[60px]'>
      <div className='flex  flex-1 py-4 px-3'>
        <div className='w-64  bg-white border-r flex flex-col border-gray-300'>
          <h2 className='font-bold text-xl'>Organizations</h2>
          <div className='py-3 flex  overflow-auto flex-col gap-3 flex-1'>
            {organizations.map((org) => {
              const currItem = organiz.find(item=>item.id === org.id);
              return (
                <ul className='bg-white   text-black border flex  flex-col rounded-md pl-6 pr-2 py-3'>
                  <li className='list-disc px-2 border rounded-md'>
                                        <div className='flex cursor-pointer  justify-between items-center' onClick={() => { setorganiz((orgn)=>orgn.map(item=>item.id === org.id ? {...item,open:!item.open} : item))}}>

                    {/* <div className='flex border justify-between items-center' onClick={() => { setorganiz((orgn)=>{return {id:org.id,open:!orgn.open}}); }}> */}
                      <div className=' text-black text-md font-semibold'>
                        {org.name}
                      </div>
                      <div className=' text-black '>
                       { currItem?.open ?  <ChevronUp size={18} className='' /> : <ChevronDown size={18} className='' />  }
                      </div>
                    </div>





               <div className={`${org.id === currItem?.id && currItem?.open ? "block" : "hidden"}`}>


 <span className=' text-sm text-gray-700'>Projects</span>
                    <div className=' flex gap-3 flex-col'>
                      {org.projects.map((project) => {
                        const currItem = proj.find(item=>item.id === project.id);
                        return (
                          <ul className='flex py-3 px-2 rounded-md border flex-col'>
                            <li className='list-disc'>
                              <div className='flex  cursor-pointer justify-between items-center' onClick={() => { setproj(projec=>projec.map(proj=> proj?.id === project.id ? {...proj,open:!proj.open} : proj)) }}>
                                <div className='text-black text-sm font-semibold'>
                                  {project.name}
                                </div>
                                <div className=' text-black '>
                       { currItem?.open ?  <ChevronUp size={18} className='' /> : <ChevronDown size={18} className='' />  }
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
                                      <div className='flex cursor-pointer justify-between items-center' onClick={() => { setdoc((docs)=>{return {id:document.id,open:!docs.open}}) }}>
                                        <div className=' text-black text-[12px] font-semibold'>
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
        <div className='border flex flex-col flex-1'>
<div className='border flex-1 flex flex-col gap-2 overflow-auto p-3'>
{chats.map((chat:any)=>{
return <div className='bg-black text-white w-fit p-2 rounded-md '>
  {chat}
</div>
})}
<div className='flex justify-end'>
<div className='bg-white w-[50px]   px-4  text-2xl text-black'>
{loadingVal}
</div>
</div>

</div>
<div className='p-2 flex justify-center gap-3 items-center'>

<input type="text" ref={inputRef}  placeholder='Ask Your knowledge...' className='w-full px-3 outline py-3 bg-white border rounded-lg'/>
<span className='bg-blue-500 py-3 text-white px-5 cursor-pointer rounded-md' onClick={()=>{
  if(!inputRef?.current)return;
  setchats((chat:any)=>[...chat,inputRef.current?.value])}
  }>send</span>
</div>
        </div>
      </div>

    </div>
  )
}

export default AI
