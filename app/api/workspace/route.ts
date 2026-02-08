import { NextResponse,NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import {prisma} from '@/lib/prisma'
import { ObjectAttributes } from "@aws-sdk/client-s3";
export async function POST(req:NextRequest)
{
const {name} = await req.json();
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
    await prisma.workspace.create({
     data:{
        name:name,
        userId:session?.user?.id,
        slug:"b"
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


export async function GET(req:NextRequest)
{
const session = await getServerSession(authOptions);
if(!session?.user?.id || !session.user.email)
{
    return NextResponse.json({message:"unauthorized user"},{
        status:405
    })
}

try {

    const workspaces = await prisma.workspace.findMany({
    where:{
       OR:[
        {
  userId:session?.user?.id
        },
        {
          members:{
            some:{
              email:session.user.email  
            }
          }
        }
       ]      
    },
    include:{
        projects:{
            include:{
                documents:{
                    include:{
                        chats:true
                    }
                }
            }
        },
        members:true
        }    
})
console.log("fetched",workspaces)
return NextResponse.json({
    workspaces
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

