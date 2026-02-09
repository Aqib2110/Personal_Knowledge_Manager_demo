import { NextResponse,NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import {prisma} from '@/lib/prisma'
export async function POST(req:NextRequest)
{
const {name,workspaceId} = await req.json();
const session = await getServerSession(authOptions);
if(!session?.user?.id)
{
    return NextResponse.json({message:"unauthorized user"},{
        status:405
    })
}

try {

    await prisma.project.create({
     data:{
        name:name,
        userId:session?.user?.id,
        workspaceId
     }
})

return NextResponse.json({
    message:"project created successfully"
},{
    status:200
})
} catch (error) {
    if(error as unknown)
    {
        return NextResponse.json({
   messag:"internal server error"
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


export async function GET(req:NextRequest)
{
const session = await getServerSession(authOptions);

if(!session?.user?.id)
{
    return NextResponse.json({message:"unauthorized user"},{
        status:405
    })
}


try {

    const projects = await prisma.project.findMany({
    where:{
        userId:session.user.id
    },
    include:{
        documents:true
    }
})

return NextResponse.json({
    projects
},{
    status:200
})
} catch (error) {
    if(error as unknown)
    {
        return NextResponse.json({
   messag:"internal server errors"
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