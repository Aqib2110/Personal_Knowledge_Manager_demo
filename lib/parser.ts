import PDFParse from 'pdf-parse2';
import mammoth from 'mammoth';
// import { GlobalWorkerOptions } from 'pdfjs-dist';
// (GlobalWorkerOptions as any).workerSrc = null;


function isValidSectionTitle(title: string): boolean {
  const clean = title.trim();

  if (!clean) return false;
  if (clean.length < 4) return false;
  if (/[0-9]/.test(clean)) return false;
  if (/^(column|row)\b/i.test(clean)) return false;

  return true;
}


function looksLikeHeading(line: string): boolean {
  if (line.length > 80) return false;

  const upperRatio =
    line.replace(/[^A-Z]/g, "").length /
    line.replace(/[^A-Za-z]/g, "").length || 0;

  return upperRatio > 0.7 && isValidSectionTitle(line);
}









// function isValidSectionTitle(title: string) {
// //   const clean = title.trim();
// //   if (!clean) return false;
//   if(/[0-9]/.test(title) ||
//    /^\d+(\.\d+)*$/.test(title) ||
//     !title  ||  /^\d+$/.test(title)
//      || /^column|row/i.test(title)
//       || title.length < 4) return false;
// //   if (!title) return false;
// //   if (/^\d+$/.test(title)) return false;
// //   if (/^column|row/i.test(title)) return false;
// //   if (title.length < 4) return false;
//   return true;
// }

// function splitIntoSections(rawText:string) 
// {
// let sections:section[] = [];
// let title = "Introduction";
// let content:string[] = [];
// const lines = rawText.split("\n").map(line=>line.trim());
// // console.log("lines",lines);
// for(const line of lines)
// {
// if(line.length > 0 && line === line.toUpperCase())
// {
//     if(content.length == 0)
//     {
//   title = line;
//     }
//     else
//     {
//         sections.push({title,content:content.join(" ")});
//         title = isValidSectionTitle(line) ? line : "body";
//         console.log(title,line,isValidSectionTitle(line));
//         content = [];
//     }
// }
// else
// {
//     content.push(line);
// }

// }
// if(content.length > 0){
//     sections.push({title,content:content.join(" ")});
// }

// return sections;
// }
function splitIntoSections(rawText: string) {
  const sections: section[] = [];
  let title = "Introduction";
  let content: string[] = [];

  const lines = rawText.split("\n").map(l => l.trim());

  for (const line of lines) {
    if (looksLikeHeading(line)) {
      if (content.length > 0) {
        sections.push({ title, content: content.join(" ") });
        content = [];
      }
      title = line;
    } else {
      content.push(line);
    }
  }

  if (content.length > 0) {
    sections.push({ title, content: content.join(" ") });
  }

  return sections;
}




interface section{
    title:string,
    content:string
}






import * as pdfjs from "pdfjs-dist/legacy/build/pdf.js";

// async function parsePDFBuffer(fileBuffer: Buffer): Promise<string> {
//   const loadingTask = pdfjs.getDocument({ data: fileBuffer });
//   const pdf = await loadingTask.promise;
//   const page = await pdf.getPage(1);
//     const content = await page.getTextContent();
//     console.log("content",content);
//   let text = "";

//   for (let i = 1; i <= pdf.numPages; i++) {
//     const page = await pdf.getPage(i);
//     const content = await page.getTextContent();
    
//     text +=
//       content.items
//         .map((item: any) => ("str" in item ? item.str : ""))
//         .join(" ") + "\n";
//   }

//   return text;
// }
export async function parsePDFBuffer(fileBuffer: Buffer): Promise<string> {
  const loadingTask = pdfjs.getDocument({ data: fileBuffer });
  const pdf = await loadingTask.promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    // Group items by approximate y coordinate
    const lines: Record<number, string[]> = {};
    content.items.forEach((item: any) => {
      const y = Math.round(item.transform[5]); // vertical position
      if (!lines[y]) lines[y] = [];
      lines[y].push(item.str);
    });

    // Sort lines by y coordinate (top to bottom)
    const sortedLines = Object.keys(lines)
      .sort((a, b) => Number(b) - Number(a)) // PDF y=0 is bottom
      .map((y) => lines[Number(y)].join(" "));

    text += sortedLines.join("\n") + "\n\n"; // extra newline between pages
  }

  return text;
}








export async function extractTextFromFile(fileBuffer:Buffer,filename?:String) : Promise<section[]>
{
const extension = filename?.split(".")[filename?.split(".").length-1];
console.log(extension);
let rawText = "";
// if(extension === "pdf"){
//     const parser = new PDFParse();
//     const data = await parser.loadPDF(fileBuffer);
//     if(!data?.text) return [];
//     rawText = data.text || "";
// }
if (extension === "pdf") {
  const text = await parsePDFBuffer(fileBuffer);
//   console.log(text);
  if (!text) return [];
  rawText = text;
}

else if(extension === "docx"){
    const data = await mammoth.extractRawText({buffer:fileBuffer});
    rawText = data.value;
}
else if(extension === "txt")
{
const data = fileBuffer.toString("utf-8");
rawText = data;
}
else{
    throw new Error("Unsupported file type");
}
return splitIntoSections(rawText);
}



export function generateKeywords(content:string): string[]
{
   return content.split(" ").filter(word => word.length > 0);
}