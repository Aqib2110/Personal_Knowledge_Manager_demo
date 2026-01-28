import { NextResponse,NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import {prisma} from '@/lib/prisma'
async function POST(req:NextRequest)
{
const {name} = await req.json();
const session = getServerSession(authOptions);


try {

    const workspaces = await prisma.workspace.create({
     data:{
        name:name,
        userId:session.id,
        slug:""
     }
})

return NextResponse.json({
    message:"workspace created successfully"
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

    const workspaces = await prisma.workspace.findMany({
    where:{
        userId:session.id
    }
})

return NextResponse.json({
    workspaces
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

export { GET,POST as handler };