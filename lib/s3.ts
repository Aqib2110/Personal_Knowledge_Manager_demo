import { GetObject$, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Readable } from "stream";

export const s3 = new S3Client({
        region:process.env.AWS_REGION,
        credentials:{
            accessKeyId:process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY!
        }
    });


export async function s3Upload(fileName:string,buffer:Buffer,fileType:string){
       const uploadParams = {
            Bucket:process.env.AWS_S3_BUCKET_NAME!,
            Key:fileName,
            Body:buffer,
            // ContentType:fileType
        };
    
        await s3.send(new PutObjectCommand(uploadParams));

    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;    
}    

function streamToBuffer(stream:Readable) : Promise<Buffer>
{
return new Promise((resolve,reject)=>{
    const chunks : Buffer[] = [];
stream.on("data",(chunk)=>{
    chunks.push(Buffer.from(chunk))
});
stream.on("error",reject);
stream.on("end",()=>{
  resolve(Buffer.concat(chunks));  
})
})
}

export async function downloadFile(fileUrl:string) : Promise<Buffer>
{
    console.log("downloading....................................")
const url = new URL(fileUrl);
const bucket = url.hostname.split(".")[0];
const key = url.pathname.slice(1);
console.log(key,bucket,url);

const command = new GetObjectCommand({
    Bucket:bucket,
    Key:key
})

const response = await s3.send(command);

if(!response.Body){
    throw new Error("Failed to download the file");
}
return streamToBuffer(response.Body as Readable); 
}