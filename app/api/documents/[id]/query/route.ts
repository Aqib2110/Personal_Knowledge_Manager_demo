// import { NextRequest,NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { runQuery } from "@/lib/query";

// export async function POST(req:NextRequest,{params}:{params:{id:string}})
// {
//  try {
//     const id = params.id;
//     const { query,workspaceId,userId } = await req.json();

//     if(!id || !query)
//     {
//         return NextResponse.json({error:"Missing id or query"}, {status:400});
//     }

//     const document = await prisma.document.findUnique({
//         where:{
//             id:id as string
//         }
//     })
//     if(!document)
//     {
//         return NextResponse.json({error:"Document not found"}, {status:404});
//     }
    

//     const answer = await runQuery(document?.sections,query);
//       await prisma.chat.create({
//         data:{
//             message:JSON.stringify({question:query,answer:answer}),
//             userId,
//             documentId:id,
//             workspaceId
//         }
//       })
//     return NextResponse.json({
//         question:query,
//         answer,
//         documentId:id
//     },{status:200})
//  } catch (error) {
//     console.error("Error in query route:", error);
//     return NextResponse.json({error:"Internal Server Error"}, {status:500});
//  }


// }