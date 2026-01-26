// "use client"
// import Image from "next/image";
// export default function Home()  {
//   const  handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const file = formData.get("file") as File;
//     const slug = formData.set("slug","my-workspace");

//     const res = await fetch("/api/document",{
//       method:"POST",
//      body:formData
//     })
//     if(!res.ok)
//     {
//       alert("File upload failed");
//       return;
//     }
//     alert("File uploaded successfully");
//   }
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-white ">
//      <form onSubmit={handleSubmit}>
//  <input className="text-black cursor-pointer" type="file" name="file"/>
//   <button className="text-black" type="submit">Upload</button>
//      </form>
    
//     </div>
//   );
// }


import React from 'react'
import Home from './components/Home'
const page = () => {
  return (
    <>
      <Home />
    </>
  )
}

export default page









