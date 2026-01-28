import { NextResponse,NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import {prisma} from '@/lib/prisma'
async function POST(req:NextRequest)
{
const {name,workspaceId} = await req.json();
const session = getServerSession(authOptions);


try {

    const project = await prisma.project.create({
     data:{
        name:name,
        userId:session.id,
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


async function GET(req:NextRequest)
{
const session = getServerSession(authOptions);



try {

    const projects = await prisma.project.findMany({
    where:{
        userId:session.id
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