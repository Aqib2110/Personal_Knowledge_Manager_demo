"use client";
import React from "react";
import { Feature } from "./Feature";
export default function Content() {
  return (
    <main className="w-full bg-gray-50">

      <section className="min-h-screen   flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h2 className="text-4xl text-black font-bold text-center mb-16">
            Everything your knowledge needs
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            <Feature
              title="AI Document Understanding"
              desc="Upload PDFs, notes, and images. Our system understands structure, meaning, and context."
            />
            <Feature
              title="Ask in Natural Language"
              desc="Ask questions like you're talking to a human. No keywords required."
            />
            <Feature
              title="Smart Summaries"
              desc="Get instant summaries of long documents with key insights highlighted."
            />
            <Feature
              title="Multi-Document Reasoning"
              desc="Ask questions across multiple files and get unified answers."
            />
            <Feature
              title="Private & Secure"
              desc="Your data stays isolated, encrypted, and owned by you."
            />
            <Feature
              title="Built for Scale"
              desc="Handles thousands of documents without slowing down."
            />
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-gray-50 flex items-center">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <h2 className="text-4xl text-black font-bold text-center mb-16">
            How it works
          </h2>

          <div className="grid md:grid-cols-3 gap-12 text-center">
            <Step
              number="01"
              title="Upload"
              desc="Upload documents, images, or notes into your workspace."
            />
            <Step
              number="02"
              title="Ingest"
              desc="Content is structured, cleaned, and indexed intelligently."
            />
            <Step
              number="03"
              title="Ask"
              desc="Ask anything. Get accurate, contextual answers instantly."
            />
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-gray-50 flex items-center">
        <div className="max-w-7xl   mx-auto px-6 py-24">
          <h2 className="text-4xl text-black font-bold text-center mb-16">
            Built for people who think
          </h2>

          <div className="grid text-black md:grid-cols-4 gap-10">
            <UseCase title="Developers" desc="Understand specs, APIs, and docs instantly." />
            <UseCase title="Students" desc="Turn notes into answers and summaries." />
            <UseCase title="Researchers" desc="Ask complex questions across papers." />
            <UseCase title="Teams" desc="Shared knowledge, zero repetition." />
          </div>
        </div>
      </section>

      <section className="  bg-gray-50   text-white flex items-center">
        <div className="max-w-4xl mx-auto py-12 px-6 text-center">
          {/* <p className="text-lg text-gray-700 mb-10">
            Stop searching. Start asking.
          </p> */}

          <button className="px-10 cursor-pointer shadow-lg py-4 bg-white text-black rounded-xl text-lg font-semibold hover:opacity-90 transition">
            Get Started Free
          </button>
        </div>
      </section>

    </main>
  )
}




function Step({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <div className="bg-white rounded-xl py-5 shadow-xl">
      <h3 className="text-2xl text-black font-semibold mt-4 mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  )
}

function UseCase({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-6 rounded-xl bg-white shadow-xl">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  )
}