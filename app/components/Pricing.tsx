"use client";
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Button } from "@/components/ui/button"; 
 import { Check } from "lucide-react";
import { useRouter } from 'next/navigation';

const Pricing = () => {
  const router = useRouter();


  return (
    <div className='min-h-screen bg-gray-50 px-6 pb-16 pt-[60px]'>
      
<div className="max-w-6xl mx-auto text-center mb-14"> <h1 className="text-4xl font-bold text-gray-900">Simple, transparent pricing</h1> <p className="mt-3 text-lg text-gray-600"> Choose a plan that fits your team and scale as you grow. </p> </div>

  <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
    <Card className="bg-white border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl">Free</CardTitle>
        <p className="text-gray-500 text-sm">For individuals getting started</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <span className="text-4xl font-bold">$0</span>
          <span className="text-gray-500"> / month</span>
        </div>

        <ul className="space-y-3 text-sm text-gray-700">
          <li className="flex items-center gap-2"><Check className="h-4 w-4" /> 1 workspace</li>
          <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Up to 50 documents</li>
          <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Basic search</li>
          <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Community support</li>
        </ul>

        <Button className="w-full" variant="outline">Get Started</Button>
      </CardContent>
    </Card>

    <Card className="bg-white border-gray-900 shadow-lg relative">
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gray-900 px-4 py-1 text-xs text-white">
        Most Popular
      </div>
      <CardHeader>
        <CardTitle className="text-xl">Pro</CardTitle>
        <p className="text-gray-500 text-sm">For professionals and small teams</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <span className="text-4xl font-bold">$19</span>
          <span className="text-gray-500"> / user / month</span>
        </div>

        <ul className="space-y-3 text-sm text-gray-700">
          <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Unlimited documents</li>
          <li className="flex items-center gap-2"><Check className="h-4 w-4" /> AI-powered Q&A</li>
          <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Projects & tags</li>
          <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Priority support</li>
        </ul>

        <Button className="w-full cursor-pointer" onClick={()=>{router.push('/checkout?plan=pro')}} >
         Upgrade to Pro
        </Button>
      </CardContent>
    </Card>

    <Card className="bg-white border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl">Enterprise</CardTitle>
        <p className="text-gray-500 text-sm">For organizations at scale</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <span className="text-4xl font-bold">Custom</span>
        </div>

        <ul className="space-y-3 text-sm text-gray-700">
          <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Unlimited workspaces</li>
          <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Advanced permissions</li>
          <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Dedicated support</li>
          <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Custom AI models</li>
        </ul>

        <Button className="w-full" variant="outline">Contact Sales</Button>
      </CardContent>
    </Card>
  </div>


    </div>
  )
}

export default Pricing





