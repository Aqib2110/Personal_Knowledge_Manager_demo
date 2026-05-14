"use client";
import Link from "next/link";
import { KnowledgeIcon } from './KnowlegeIcon';
const Logo = () => {
  return (
    <div>
       <Link href={"/"} >
                    <div className="flex h-full cursor-pointer justify-center py-3  items-center gap-2">
                      <span>
                        <KnowledgeIcon className="w-6 h-6 text-blue-700" />
                      </span>
                      <span className="text-xl text-white font-bold">
                        Knowledge<span className="text-white">Hub</span>{" "}
                      </span>
                    </div>
                  </Link>
    </div>
  )
}

export default Logo
