import { NextResponse,NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req:NextRequest,{params}:{
    params:Promise<{id:string}>
}) 
{
const {id} = await params;

if(!id)
{
return NextResponse.json({
    message:"Id is missing"
},{
    status:400
})
}

try {
    const chats = await prisma.document.findFirst({
    where:{
        id
    },
    include:{
        chats:{
           include:{
            user:true
           }
        }
    }
})
if(!chats)
{
 return NextResponse.json({
    message:"No chats Found",
},{status:400})
}
return NextResponse.json({
   chats:chats?.chats
},{
    status:200
})

} 
catch (error) 
{
    if(error as unknown)
    {
        return NextResponse.json({
            message:"internal server error",
        },{status:500})
    }
     return NextResponse.json({
            message:"internal server error",
     },{status:400})
}


}