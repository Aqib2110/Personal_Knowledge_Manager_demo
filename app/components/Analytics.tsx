"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, } from "recharts";
import { CrossIcon, MenuIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { puter } from "@heyputer/puter.js";

const aiImpact = [{ day: "Mon", questions: 120 }, { day: "Tue", questions: 180 }, { day: "Wed", questions: 220 }, { day: "Thu", questions: 300 }, { day: "Fri", questions: 420 },];

interface WorkspaceTypes {
  id: string,
  name: string,
  userId: string,
  slug: string,
  projects: [{
    id: string,
    name: string,
    workspaceId: string,
    userId: string,
    documents: [{
      id: string,
      title: string,
      status: string
      chats:[{
        id:string,
        message:string,
        createdAt:Date
    }]
    }]
  }]
}

export default function AnalyticsPage() {
  const [sidebar, setsidebar] = useState(false);
  const [organizations, setorganizations] = useState<WorkspaceTypes[]>([])
  const [documentId, setdocumentId] = useState('');
  const [chats, setchats] = useState<any>([]);
  const [loading, setloading] = useState(true);
  const [documents, setdocuments] = useState<any>({chats:[],docs:[]});
  const [docAnalytics, setdocAnalytics] = useState<any>([]);
  const [lineAnalytics, setlineAnalytics] = useState<any>([]);
  const [document, setdocument] = useState({id:"",title:""});
const kpis = [{ label: "Total Documents", value: documents.docs.length }, { label: "Active Documents", value: documents.docs.length }, { label: "AI Questions", value: documents.chats.length }, { label: "AI Success Rate", value: "92%" },];

  useEffect(() => {
    if(organizations.length < 1) return;
    const chat = organizations?.flatMap(org=>org?.projects?.flatMap(proj=>proj?.documents?.flatMap(doc=>doc?.chats?.flatMap(chat=>{
      return {
     docId:doc.id,
     question:JSON.parse(chat?.message).question,
     createdAt:chat?.createdAt
    }
  }))))
  
     puter.ai.chat(`
You are given a list of user questions.

Your task:
- For EACH question, determine its BASIC INTENT.
- Return maximum 2–3 words per question.
- return in the same array in order as given every object should contain docId and question intent and createdAt.
- Do NOT repeat the full question.
- Use clear, analytics-friendly keywords.
- Keep the intent generic (topic-based, not sentence-based).

Output format:
Return an array of objects like this:
[
  { "question": "intent here" }
]

Here is the list of questions:
${JSON.stringify(chat)}`)
 .then(res=>{
 console.log(res?.message?.content,"intent");
const raw = res?.message?.content;
if (typeof raw !== "string") return;
setchats(JSON.parse(raw));
 setloading(false);
 })
    const docs = organizations?.flatMap(org=>org?.projects?.flatMap(proj=>proj?.documents?.map(doc=>{return {docId:doc.id,title:doc.title}})))
     setdocuments({
      chats:chat,
      docs:docs
    })
   
  }, [organizations])

  useEffect(() => {
   if(!document.id || !document.title ) return;
   console.log(chats,document,"chats");
   const analyticsArr:{question:string,views:number}[]=[];
  const lineAnalyticsArr:{day:string,questions:number}[]=[];
   const BarAnalytics = chats?.filter((chat:any)=>chat?.docId == document.id);
   BarAnalytics.map((item:any)=>{
   if(analyticsArr[item.question]){
    analyticsArr[item.question].views += 1;
   } else {
    analyticsArr.push({question:item.question,views:1});
   }
  })

  if(analyticsArr.length > 5) {
    analyticsArr.sort((a,b)=>b.views - a.views);
    while(analyticsArr.length > 5) {
      analyticsArr.pop();
    }
  }

const today = new Date();
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(today.getDate() - 6);

BarAnalytics.forEach((item: any) => {
  const createdAt = new Date(item.createdAt);
  console.log(createdAt, "createdAt");

  if (createdAt < sevenDaysAgo) return;

  const day = createdAt.toLocaleDateString("en-US", {
    weekday: "short",
  });

  const existingDay = lineAnalyticsArr.find(d => d.day === day);

  if (existingDay) {
    existingDay.questions += 1;
  } else {
    lineAnalyticsArr.push({ day, questions: 1 });
  }
});

  setlineAnalytics(lineAnalyticsArr);
   setdocAnalytics(analyticsArr);
     }, [document])
  
  
  useEffect(() => {
    fetch("/api/workspace")
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! ${res.statusText}`)
        }
        return res.json();
      })
      .then((data: any) => {
        console.log(data.workspaces, "data")
        setorganizations(data.workspaces);
      })
  }, [])
console.log(lineAnalytics);

  return (
 
  <div className="min-h-screen overflow-auto relative pt-[60px] bg-gray-50 flex">
    <div className="h-full md:flex relative w-full">
      
      <aside className={`${sidebar ? "w-[80%]" : "w-[8%]"}  h-full md:w-[30%] lg:w-[25%] fixed md:relative mt-[60px] md:mt-0 z-10 md:z-0 top-0 left-0 ${sidebar ? "border-r border-gray-200 bg-white" : ""}`}>
        {sidebar ? <CrossIcon size={15} className="text-black block md:hidden absolute rotate-[45deg] top-3 right-3" onClick={() => { setsidebar(false); }} />
          : <MenuIcon size={15} className="text-black absolute md:hidden top-3 right-1" onClick={() => { setsidebar(true); }} />}
        <div className={`p-5 ${sidebar ? "block" : "hidden"} md:block border-b border-gray-200`}>
          <h2 className="font-semibold text-gray-900">Workspaces</h2>
        </div> <ScrollArea className={`${sidebar ? "block" : "hidden"} md:block h-[calc(100vh-64px)]`}> <div className="p-4 space-y-6">
           {organizations.map((ws) => (<div key={ws.name}> <p className="text-sm  font-medium text-gray-700 mb-2"> {ws.name} </p> <ul className="space-y-1 text-sm text-gray-600"> {ws.projects.flatMap(document=>document.documents.map((doc) => (<li
          key={doc.id}
          className={` rounded ${loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"} px-2 py-1 ${doc.id === documentId ? "bg-gray-100" : ""}`}
          onClick={()=>{setdocument({id:doc.id,title:doc.title});setdocumentId(doc.id);}}
        > {doc.title} </li>)))} </ul> </div>))} </div> </ScrollArea> </aside>

      <main className=" md:pl-8 pl-[10%] border w-[100%] min-h-screen  h-full p-8 space-y-10">
        <h1 className="text-3xl font-semibold text-gray-900">
          Analytics Overview
        </h1>

       {loading ? <p>Loading analytics...</p> : 
        <div className="space-y-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <Card key={kpi.label} className="bg-white border-gray-200">
              <CardContent className="p-6">
                <p className="text-sm text-gray-500">{kpi.label}</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  {kpi.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

       { document.id ? <div className="flex flex-col gap-5">
         <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle>Most Used Documents</CardTitle>
          </CardHeader>
          <CardContent className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={docAnalytics}>
                <XAxis dataKey="question" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#111827" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle>AI Questions Over Time</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineAnalytics}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="questions"
                  stroke="#111827"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
       </div> : <div className="text-center text-gray-500 mt-20">
        Select a document to view analytics.
        </div>
       }
       </div>}
      </main>
    </div>

  </div>

  );
}