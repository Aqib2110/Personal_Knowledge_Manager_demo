import { NextResponse,NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import {prisma} from '@/lib/prisma'
export async function POST(req:NextRequest)
{
const {name,email,workspaceId,role} = await req.json();
console.log("reach backend",name)
const session = await getServerSession(authOptions);
if(!session?.user?.id)
{
    return NextResponse.json({message:"unauthorized user"},{
        status:405
    })
}

try {
console.log("trying");
    await prisma.member.create({
     data:{
        name:name,
        userId:session?.user?.id,
        email,
        workspaceId,
        role
     }
})

return NextResponse.json({
    message:"member created successfully"
},{
    status:200
})
} catch (error) {
    if(error as unknown)
    {
        return NextResponse.json({
   error:"internal server error"
},{
    status:500
})
    }
    return NextResponse.json({
   error:error
},{
    status:400
})
}

}
