"use client";

import { useState } from "react";
import { Search, Upload, FileText, FileImage, FileAudio } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LibraryPage() {
  const [view, setView] = useState<"grid" | "list">("grid");

  const documents = [
    {
      id: 1,
      title: "Product Requirements",
      type: "pdf",
      project: "Core App",
      tags: ["product", "spec"],
    },
    {
      id: 2,
      title: "UI Research",
      type: "image",
      project: "Design",
      tags: ["ux"],
    },
    {
      id: 3,
      title: "Meeting Recording",
      type: "audio",
      project: "Ops",
      tags: ["meeting"],
    },
  ];

  const iconForType = (type: string) => {
    switch (type) {
      case "image":
        return <FileImage className="h-6 w-6" />;
      case "audio":
        return <FileAudio className="h-6 w-6" />;
      default:
        return <FileText className="h-6 w-6" />;
    }
  };

  return (
    <div className="min-h-screen pt-[60px] z-10 bg-gray-50 text-white">
      {" "}
      {" "}
      <div className=" z-20 border-b border-gray-300 border bg-gray-50 backdrop-blur">
        {" "}
        <div className="flex items-center justify-between px-6 py-4">
          {" "}
          <h1 className="text-xl text-black font-semibold">Library</h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-700" />
              <Input
                placeholder="Search documents..."
                className="pl-9 bg-white border-white/10 text-gray-700 focus-visible:ring-0"
              />
            </div>
            <Button className="gap-2 cursor-pointer hover:bg-black hover:text-white bg-white text-black">
              <Upload className="h-4 w-4 " /> Upload
            </Button>
          </div>
        </div>
      </div>
      <div className="flex">
        <aside className="hidden lg:block w-64 border-r border-gray-300 p-6 space-y-6">
          <div>
            <h3 className="mb-3 text-sm text-gray-500 font-semibold ">
              Projects
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="text-black">All Documents</li>
              <li className="text-gray-400 hover:text-white cursor-pointer">
                Core App
              </li>
              <li className="text-gray-400 hover:text-white cursor-pointer">
                Design
              </li>
              <li className="text-gray-400 hover:text-white cursor-pointer">
                Ops
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-500">Tags</h3>
            <ul className="flex flex-wrap gap-2 text-xs">
              <li className="rounded-full bg-white text-gray-500 px-3 py-1">#product</li>
              <li className="rounded-full bg-white text-gray-500 px-3 py-1">#ux</li>
              <li className="rounded-full bg-white text-gray-500 px-3 py-1">#meeting</li>
            </ul>
          </div>
        </aside>

        <main className="flex-1 p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-black">
              {documents.length} documents
            </p>
            <div className="flex text-black  gap-2">
              <Button
                variant={view === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("grid")}
              >
                Grid
              </Button>
              <Button
                variant={view === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("list")}
              >
                List
              </Button>
            </div>
          </div>

          {view === "grid" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {documents.map((doc) => (
                <Card
                  key={doc.id}
                  className="bg-white border-gray-100 border hover:bg-white/10 transition"
                >
                  <CardContent className="p-4 space-y-3">
                    <div className="flex text-black items-center gap-3">
                      {iconForType(doc.type)}
                      <h3 className="font-medium text-black truncate">{doc.title}</h3>
                    </div>
                    <p className="text-xs text-gray-700 ">
                      Project: {doc.project}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {doc.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white text-black px-2 py-0.5 text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex bg-white items-center justify-between rounded-lg border border-white/10 p-4"
                >
                  <div className="flex text-black items-center gap-3">
                    {iconForType(doc.type)}
                    <div>
                      <p className="font-medium text-black">{doc.title}</p>
                      <p className="text-xs text-gray-500 ">{doc.project}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {doc.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full text-gray-500 px-2 py-0.5 text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
