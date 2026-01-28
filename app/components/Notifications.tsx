import { Card } from "@/components/ui/card"
import {
  FileText,
  Bot,
  Users,
  ShieldCheck,
} from "lucide-react"

export default function Notifications() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <p className="text-sm text-gray-500">
          Recent activity across your workspaces
        </p>
      </div>

      <div className="max-w-3xl space-y-8">

        <Section title="Today">
          <Notification
            icon={<FileText className="h-5 w-5 text-blue-600" />}
            title="Document uploaded"
            description="API_Spec.pdf was uploaded to Workspace Alpha"
            time="2 minutes ago"
            unread
          />

          <Notification
            icon={<Bot className="h-5 w-5 text-purple-600" />}
            title="AI processing completed"
            description="Design_Docs.pdf is now ready for questions"
            time="1 hour ago"
          />
        </Section>

        <Section title="Yesterday">
          <Notification
            icon={<Users className="h-5 w-5 text-green-600" />}
            title="New workspace member"
            description="John joined Workspace Marketing"
            time="Yesterday"
          />

          <Notification
            icon={<ShieldCheck className="h-5 w-5 text-orange-600" />}
            title="Role updated"
            description="Your role was changed to Admin"
            time="Yesterday"
          />
        </Section>

      </div>
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h2 className="mb-4 text-sm font-semibold text-gray-500 uppercase">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function Notification({
  icon,
  title,
  description,
  time,
  unread,
}: {
  icon: React.ReactNode
  title: string
  description: string
  time: string
  unread?: boolean
}) {
  return (
    <Card className="flex items-start gap-4 p-4 hover:bg-gray-100 transition cursor-pointer">
      
      <div className="mt-1">{icon}</div>

      <div className="flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>

      {unread && (
        <span className="h-2 w-2 rounded-full bg-blue-600 mt-2" />
      )}
    </Card>
  )
}