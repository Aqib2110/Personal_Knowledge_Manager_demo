import { NextResponse,NextRequest } from "next/server";
import  {prisma} from "@/lib/prisma";
import { s3Upload } from "@/lib/s3";
import { queue } from "@/lib/queue";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
export async function POST(req:NextRequest)
{
    const session = await getServerSession(authOptions);
    if(!session)
    {
     return NextResponse.json({message:"Unauthorized"},{status:401});
    }
    const data = await req.formData();
    const file = data.get("file") as File;
    const slug = data.get("slug") as String;
    const title = file?.name;
    const userId = (session.user as any).id;
    console.log(file,userId);
    if(!file || !slug || !title || !userId)
    {
     return NextResponse.json({message:"All Fields are required"},{status:400})
    }

    // const workspace = await prisma.workspace.findUnique({
    //     where:{
    //         slug:slug as string,
    //         userId:userId as string
    //     }
    // });

    // if(!workspace)
    // {
    //     return NextResponse.json({message:"Workspace not found"},{status:404});
    // }
    // const workspaceId = workspace.id;

    const workspaceId = "test-workspace-id";
    const fileData = await file.arrayBuffer();
    const buffer = Buffer.from(fileData);
    const fileName = `documents/${Date.now()}_${file.name}`;

console.log(process.env.AWS_S3_BUCKET_NAME,process.env.AWS_ACCESS_KEY_ID,process.env.AWS_SECRET_ACCESS_KEY);

//    try {
//     const s3Url = await s3Upload(fileName,buffer,file.type);
//     const document = await prisma.document.create({
//         data:{
//             title: title as string,
//             workspaceId: workspaceId as string,
//             userId: userId as string,
//             fileUrl:s3Url,
//             fileName:file.name,
//             status:"processing"
//         }
//     });
    // await queue.add('process_document',{
    //     documentId:document?.id,
    //     workspaceId:workspaceId.toString(),
    //     filePath:s3Url
    // })
      await queue.add('process_document',{
        documentId:'13d6e6ba-6c84-4873-a6cd-d28219d02923',
        workspaceId:workspaceId.toString(),
        filePath:"https://amznz-s3-knowledge-bucket.s3.eu-north-1.amazonaws.com/documents/1766746887437_file-sample_150kB.pdf",
        fileName:"documents/1766746887437_file-sample_150kB.pdf"
    })

//     return NextResponse.json({message:"Document uploaded successfully",document,status:document.status},{status:200});
//    } catch (error) { 
//     console.error("Error uploading document:", error);
//     return NextResponse.json({message:"Internal Server Error",error},{status:500});
//    }
// }
}