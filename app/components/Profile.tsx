"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Settings, Shield } from "lucide-react"
import { useRouter } from "next/navigation"

export function Profile() {
  const router = useRouter()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="h-9 w-9 cursor-pointer">
          <AvatarImage src="/avatar.png" />
          <AvatarFallback>MA</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-48 bg-white shadow-lg"
      >
        <DropdownMenuItem
          onClick={() => router.push("/settings")}
          className="cursor-pointer gap-2"
        >
          <Settings className="h-4 w-4" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push("/roles")}
          className="cursor-pointer gap-2"
        >
          <Shield className="h-4 w-4" />
          Roles & Permissions
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}