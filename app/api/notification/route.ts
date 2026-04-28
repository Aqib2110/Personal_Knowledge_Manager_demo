import { NextResponse,NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import {prisma} from '@/lib/prisma'
export async function POST(req:NextRequest)
{
const {type,reach,workspaceId,title,documentId,roleOwn,memberId} = await req.json();
const session = await getServerSession(authOptions);
if(!session?.user?.id)
{
    return NextResponse.json({message:"unauthorized user"},{
        status:405
    })
}

try {
    await prisma.notification.create({
     data:{
       userId:session?.user?.id,
       workspaceId,
       title,
       type:type,
       reach:reach,
       documentId:documentId || null,
       memName:roleOwn,
       memberId:memberId
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


export async function GET(req:NextRequest)
{
    // ,{params}:{params:Promise<{workspaceId:string}>
const session = await getServerSession(authOptions);
if(!session?.user?.id || !session?.user?.email)
{
    return NextResponse.json({message:"unauthorized user"},{
        status:405
    })
}

try {
const Notification = await prisma.notification.findMany({
  where: {
    OR:[
        {
            userId:session.user.id
        },
         {workspace: {
      members: {
        some: {
         OR:[
            {
             email: session.user.email,
            },
            {
             userId: session.user.id,
            },
         ] 
        },
      },
    },

}
    ]
   
  },
  include: {
    document:true,
    workspace: {
        include:{
            members:true,
        }
    }, 
        
  },
});
return NextResponse.json({
    Notification,
    user:session.user
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

