import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const workspaces = [
  { id: "1", name: "Product Team" },
  { id: "2", name: "Marketing" },
  { id: "3", name: "Client Docs" },
]

const members = [
  { name: "Muhammad Aqueel", email: "aqueel@mail.com", role: "Admin" },
  { name: "Sarah Khan", email: "sarah@mail.com", role: "Editor" },
  { name: "John Doe", email: "john@mail.com", role: "Viewer" },
]

export default function Roles() {
  return (
    <div className="flex pt-[60px] h-screen bg-gray-50">
      
      <aside className="w-72 border-r bg-white p-4">
        <h2 className="mb-4 text-sm font-semibold text-gray-500">
          Workspaces
        </h2>

        <div className="space-y-1">
          {workspaces.map(ws => (
            <button
              key={ws.id}
              className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium hover:bg-gray-100 bg-gray-100"
            >
              {ws.name}
            </button>
          ))}
        </div>
      </aside>

      <main className="flex-1 overflow-auto p-8 space-y-8">

        <div>
          <h1 className="text-2xl font-semibold">Product Team</h1>
          <p className="text-sm text-gray-500">
            Manage members and their roles in this workspace
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Invite Members</h3>

          <div className="flex gap-3">
            <Input placeholder="email@example.com" />
            
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>

            <Button>Send Invite</Button>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Members</h3>

          <div className="divide-y">
            {members.map(member => (
              <div
                key={member.email}
                className="flex items-center justify-between py-4"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {member.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.email}</p>
                  </div>
                </div>

                <Select defaultValue={member.role.toLowerCase()}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Roles & Permissions</h3>

          <ul className="space-y-3 text-sm text-gray-600">
            <li>
              <strong>Admin:</strong> Manage workspace, members, billing, and documents
            </li>
            <li>
              <strong>Editor:</strong> Upload documents, organize content, ask AI questions
            </li>
            <li>
              <strong>Viewer:</strong> Ask AI questions only
            </li>
          </ul>
        </div>

      </main>
    </div>
  )
}