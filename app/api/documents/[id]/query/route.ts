import { NextRequest,NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { runQuery } from "@/lib/query";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
export async function POST(req:NextRequest,{params}:{params:Promise<{id:string}>})
{
    console.log("rech")
 try {
    const {id} = await params;
    const { query,workspaceId } = await req.json();
const session = await getServerSession(authOptions);
if(!session?.user?.id)
{
    return NextResponse.json({message:"unauthorized user"},{
        status:405
    })
}

console.log(id,query,workspaceId,session.user.id)
console.log("reching")
    if(!id || !query)
    {
        return NextResponse.json({error:"Missing id or query"}, {status:400});
    }

    const document = await prisma.document.findUnique({
        where:{
            id:id as string
        },
        include:{
            sections:true
        }
    })
    if(!document)
    {
        return NextResponse.json({error:"Document not found"}, {status:404});
    }
    
console.log(document);
    const answer = await runQuery(document?.sections,query);
      await prisma.chat.create({
        data:{
            message:JSON.stringify({question:query,answer:answer.answer}),
            userId:session.user.id,
            documentId:id,
            workspaceId,
            sectionName:answer?.sectionName || null,
            matchScore:answer?.matchScore || null
        },
        include:{
            document:true,
        }
      })
    return NextResponse.json({
        question:query,
        answer,
        documentId:id,
        sectionName:answer?.sectionName || null,
        matchScore:answer?.matchScore || null
    },{status:200})
 } catch (error) {
    console.error("Error in query route:", error);
    return NextResponse.json({error:"Internal Server Error"}, {status:500});
 }
}