"use client";
import { BellIcon } from "lucide-react";
import Link from "next/link";
const NotifiLink = () => {
  return (
    <div className="p-2 relative">
       <Link href={'/notifications'} className="">
      <span className="absolute p-1 top-1 right-1 bg-blue-500 rounded-full"></span>
        <BellIcon size={22} className="text-white" />

                </Link>
    </div>
  )
}

export default NotifiLink
