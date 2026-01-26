"use client";
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Tags() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 pt-[60px]">
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Tags</h1>
        <p className="text-gray-600 mt-1">
          Organize and explore your documents using tags.
        </p>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 mb-8">
        <Input
          placeholder="Search tags..."
          className="bg-white border-gray-200"
        />
        <Button>Create Tag</Button>
      </div>

      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[
          { name: "AI", count: 12 },
          { name: "Frontend", count: 8 },
          { name: "Backend", count: 5 },
          { name: "DevOps", count: 4 },
          { name: "Security", count: 3 },
          { name: "Design", count: 6 },
        ].map((tag) => (
          <Card
            key={tag.name}
            className="hover:shadow-md transition bg-white border-gray-200"
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  #{tag.name}
                </h3>
                <span className="text-sm text-gray-500">
                  {tag.count} docs
                </span>
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm">
                  View
                </Button>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}