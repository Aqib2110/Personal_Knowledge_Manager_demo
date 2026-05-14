"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Settings, Shield } from "lucide-react"
import Link from "next/link"

const Profile = ({ session }:{ session: any }) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="md:h-9 bg-white md:w-9 h-7 w-7 cursor-pointer">
          {
            session?.user?.image ? <AvatarImage src={session?.user?.image} /> : <AvatarFallback className="text-black">{session?.user?.name ? session?.user.name.toUpperCase().charAt(0) : "U"}</AvatarFallback>
          }
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-48 bg-white shadow-lg"
      >
        <Link href={"/workspaces"}>
          <DropdownMenuItem
            className="cursor-pointer gap-2"
          >
            <Shield className="h-4 w-4" />
            Workspaces
          </DropdownMenuItem>
        </Link>

        <Link href={"/roles"}>
          <DropdownMenuItem
            className="cursor-pointer gap-2"
          >
            <Shield className="h-4 w-4" />
            Roles & Permissions
          </DropdownMenuItem>
        </Link>

        <Link href={"/settings"}>

          <DropdownMenuItem
            className="cursor-pointer gap-2"
          >
            <Settings className="h-4 w-4" />
            Settings
          </DropdownMenuItem>
        </Link>


      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default React.memo(Profile);
