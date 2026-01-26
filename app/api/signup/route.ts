import { NextRequest,NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req:NextRequest)
{
    const {name,email,password} = await req.json();
    console.log(name,email,password);
   if(!name || !email || !password)
   {
    return NextResponse.json({message:"All Fields are required"},{
        status:400
    })
   }
 try {
       console.log("User created successfully");

      await prisma.user.create({
    data:{
        name,
        email,
        password
    }
   })
   return NextResponse.json({message:"user created successfully"},{
    status:200
   })
 } catch (error) {
    console.error("Prisma error:", error);
    if(error instanceof Error)
    {
        return NextResponse.json({message:error.message},{
            status:400 
        })
    }
    // return NextResponse.json({message:"Internal Server Error"},{
    //     status:500
    // })
 }

}
;