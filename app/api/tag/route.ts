import { NextRequest,NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
export async function POST(req:NextRequest){
try {
    const {documentId,tag} = await req.json();
    const session = await getServerSession(authOptions);
    if(!session?.user)
    {
        return NextResponse.json({error:"Unauthorized"}, {status:401})
    }
    if(!documentId || !tag)
    {
        return NextResponse.json({error:"Missing required fields"}, {status:400})
    }

   const document = await prisma.document.findFirst({
  where: {
    id: documentId,
    userId: session.user.id,
  },
  select: { tags: true },
});

if (!document) {
  return NextResponse.json({ error: "Document not found" }, { status: 404 });
}

const newTags = tag
  .split(",")
  .map((t: string) => t.trim())
  .filter(Boolean);

const mergedTags = Array.from(
  new Set([...(document.tags ?? []), ...newTags])
);

await prisma.document.update({
  where: {
    id: documentId,
    userId: session.user.id,
  },
  data: {
    tags: {
      set: mergedTags,
    },
  },
});

 return NextResponse.json({message:"Tag added successfully"}, {status:200})
} catch (error) {
    if(error instanceof Error)
    {
        return NextResponse.json({error:error.message}, {status:500})
    }
    return NextResponse.json({error:"internal server error"}, {status:500})
}


}