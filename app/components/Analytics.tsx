"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { ScrollArea } from "@/components/ui/scroll-area";
 import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, } from "recharts";

 const kpis = [ { label: "Total Documents", value: 324 }, { label: "Active Documents", value: 87 }, { label: "AI Questions", value: 1240 }, { label: "AI Success Rate", value: "92%" }, ];

const documentAnalytics = [ { name: "Product Requirements", views: 120 }, { name: "Design Docs", views: 90 }, { name: "API Spec", views: 160 }, { name: "Meeting Notes", views: 60 }, ];

const aiImpact = [ { day: "Mon", questions: 120 }, { day: "Tue", questions: 180 }, { day: "Wed", questions: 220 }, { day: "Thu", questions: 300 }, { day: "Fri", questions: 420 }, ];

const workspaces = [ { name: "Acme Inc", documents: ["Product Requirements", "Design Docs", "API Spec"], }, { name: "Personal", documents: ["Meeting Notes", "Ideas"], }, ];


 export default function AnalyticsPage() {
 return ( <div className="min-h-screen pt-[60px] bg-gray-50 flex"> {/* Sidebar */} 
 <aside className="w-72 border-r border-gray-200 bg-white"> 
    <div className="p-5 border-b border-gray-200"> 
        <h2 className="font-semibold text-gray-900">Workspaces</h2> 
        
        </div> <ScrollArea className="h-[calc(100vh-64px)]"> <div className="p-4 space-y-6"> {workspaces.map((ws) => ( <div key={ws.name}> <p className="text-sm  font-medium text-gray-700 mb-2"> {ws.name} </p> <ul className="space-y-1 text-sm text-gray-600"> {ws.documents.map((doc) => ( <li
key={doc}
className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100"

> {doc} </li> ))} </ul> </div> ))} </div> </ScrollArea> </aside>

{/* Main Content */}
  <main className="flex-1 p-8 space-y-10">
    <h1 className="text-3xl font-semibold text-gray-900">
      Analytics Overview
    </h1>

    {/* 1️⃣ KPI Section */}
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

    {/* 3️⃣ Document Usage Analytics */}
    <Card className="bg-white border-gray-200">
      <CardHeader>
        <CardTitle>Most Used Documents</CardTitle>
      </CardHeader>
      <CardContent className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={documentAnalytics}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="views" fill="#111827" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>

    {/* 5️⃣ AI Usage Trend Over Time */}
    <Card className="bg-white border-gray-200">
      <CardHeader>
        <CardTitle>AI Questions Over Time</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={aiImpact}>
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
  </main>
</div>

); 
}