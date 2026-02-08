import { NextRequest,NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/lib/prisma";
export async function POST(req:NextRequest)
{
const {memberId,workspaceId,role} = await req.json();
const session = await getServerSession(authOptions);
if(!session?.user?.id || !session?.user?.email)
{
    return NextResponse.json({message:"unauthorized user"},{
        status:405
    })
}

try {
    await prisma.member.update({
         where:{
            id:memberId,
            workspaceId:workspaceId
        },
        data:{
            role:role
        }
})

return NextResponse.json({
    message:"notification pushed successfully"
},{
    status:200
})
} catch (error) {
    if(error as unknown)
    {
        return NextResponse.json({
   message:"internal server error"
},{
    status:500
})
    }
    return NextResponse.json({
   message:error
},{
    status:400
})
}

}