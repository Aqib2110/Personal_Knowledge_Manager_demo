import { NextResponse,NextRequest } from "next/server";
import  {prisma} from "@/lib/prisma";
import { s3Upload } from "@/lib/s3";
import { queue } from "@/lib/queue";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export async function POST(req:NextRequest)
{
    const session = await getServerSession(authOptions);
    // console.log(session,"session");
    if(!session?.user.id)
    {
     return NextResponse.json({message:"Unauthorized"},{status:401});
    }

    const data = await req.formData();
    console.log(data,"data");
    const file = data.get("file") as File;
   const workspaceId = data.get("workspaceId");
   const projectId = data.get("projectId");
    console.log("3",file,workspaceId,projectId);
console.log("cergyutrhghui jtrn htrytvrrgiutyrhotui")
console.log(process.env.REDIS_HOST,process.env.REDIS_PASSWORD,Number(process.env.REDIS_PORT),process.env.REDIS_USERNAME,"redis")
    const title = file?.name;
   
    if(!file || !title || !workspaceId || !projectId)
    {
     return NextResponse.json({message:"All Fields are required"},{status:400})
    }

    const fileData = await file.arrayBuffer();
    const buffer = Buffer.from(fileData);
    const fileName = `documents/${Date.now()}_${file.name}`;
        // const fileName = `documents/1769703306789_vref_onlinenotepad.io.pdf`;


   try {
    const s3Url = await s3Upload(fileName,buffer,file.type);

    const document = await prisma.document.create({
        data:{       
            title: title as string,
            workspaceId: workspaceId as string,
            userId: session.user.id as string,
            fileUrl:s3Url,
            projectId:projectId as string,
            fileName:fileName,
            status:"processing"
        }
    });
    console.log("process");
    console.log(document?.id,workspaceId,s3Url,fileName,"process");
    await queue.add('process_document',{
        documentId:document?.id,
        workspaceId:workspaceId,
        filePath:s3Url,
        fileName:fileName,
        userId:session.user.id
    })

    return NextResponse.json({message:"Document uploaded successfully",document,status:document.status},{status:200});
   } catch (error) { 
    console.error("Error uploading document:", error);
    return NextResponse.json({message:"Internal Server Error",error},{status:500});
   }
}

export async function GET(req:NextRequest)
{
const session = await getServerSession(authOptions);
if(!session?.user?.id || !session?.user?.email)
{
    return NextResponse.json({message:"unauthorized user"},{
        status:405
    })
}

try {

    const document = await prisma.workspace.findMany({
    where:{
        OR:[
            {
  userId:session.user.id,
            },
            {
             members:{
       some:{
        OR:[
            {
                email:session?.user?.email
            },
            {
                userId:session?.user?.id
            }
            ]
           }   
                    }  
            }
        ]
    
     
    },
    include:{
    members:true,
    projects:true,
    documents:{
        include:{
            project:true
        }
    }
    }
})

return NextResponse.json({
    document
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