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


export function Profile({session}:{session:any}) {
  const router = useRouter();
console.log(session);
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="md:h-9 bg-white md:w-9 h-7 w-7 cursor-pointer">
          {
            session?.data?.user?.image ? <AvatarImage src={ session?.data?.user?.image } /> : <AvatarFallback className="text-black">{session?.data?.user?.name ? session.data.user.name.charAt(0) : "U"}</AvatarFallback>
          }
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-48 bg-white shadow-lg"
      >
 <DropdownMenuItem
          onClick={() => router.push("/workspaces")}
          className="cursor-pointer gap-2"
        >
          <Shield className="h-4 w-4" />
          Workspaces
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push("/roles")}
          className="cursor-pointer gap-2"
        >
          <Shield className="h-4 w-4" />
          Roles & Permissions
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push("/settings")}
          className="cursor-pointer gap-2"
        >
          <Settings className="h-4 w-4" />
          Settings
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}