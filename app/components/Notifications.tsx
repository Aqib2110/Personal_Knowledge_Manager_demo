"use client";
import { Card } from "@/components/ui/card"
import {
  FileText,
  Bot,
  Users,
  ShieldCheck,
} from "lucide-react"
import { useEffect,useState } from "react"
import Workspace from "./Workspace";
export default function Notifications() {


   function NotificationTime(time:number):string | undefined
   {

    const secs = Math.floor(time / 1000);
    const mins = Math.floor(secs / 60);
    const hours = Math.floor(mins/60);
    const days = hours/24;
      const day = Math.floor(hours/24);
    console.log(days);
    if(days < 1 )return `Today`;
    else if(days > 2)return `Older`;
    else if(days > 1 && days < 2)return `Yesterday`;
    else if(day > 1)return `${day} day's ago`;
    else if(hours > 1)
    return `${hours} hour's ago`;
    else if(mins > 1)
    return `${mins} minutes ago`;
    else if(secs > 1)
    return `${secs} seconds ago`;
    return undefined;
    }
  const [notifications, setnotifications] = useState<{
    id:string
    reach:string
    createdAt:Date
    title:string
    type:string
    userId:string
    workspaceId:string
    memberId:{
      id:string
      name:string
      role:string
    }
    memName:string
    document:{
      id:string,
      title:string
    }
    workspace:{
      id:string
      name:string
      members:[{
      id:string
      email:string
      role:string
      workspaceId:string
      name:string
      userId:string
    }]
   
    }}[]>([]);
    interface userInterface{
      id:string
      name:string
      email:string
    }
    const [user, setuser] = useState<userInterface>({id:'',name:'',email:''});
    const userList:userInterface[]=[];
    const userListYes:userInterface[]=[];
    const userListOld:userInterface[]=[];
    const date = new Date();

   useEffect(() => {
   fetch("/api/notification")
   .then(res=>{
    if(!res.ok)
    {
      throw new Error(`http Error : ${res.statusText}`);
    }
    return res.json();
    })
    .then(data=>{
      setnotifications(data.Notification);
      setuser(data.user);
      console.log(data);
    }).catch(err=>console.error(err))
    }, [])
  
  return (
    <div className="min-h-screen  bg-gray-50 px-8 pb-8 pt-[60px]">
      
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <p className="text-sm text-gray-500">
          Recent activity across your workspaces
        </p>
      </div>

      <div className="max-w-3xl space-y-8">

<Section title="Today">
  {notifications.map(notification => {
    const diffTime =
      date.getTime() - new Date(notification.createdAt).getTime();

    if (NotificationTime(diffTime) !== "Today") return null;

    if (notification.type === "member_notification") {
      return notification.workspace.members.map(mem => {
        const exists = userList.find(
          u => u.id === mem.id && mem.workspaceId === notification.workspaceId
        );
        if (exists) return null;

        userList.push(mem);

        return (
          <Notification
            key={`${notification.id}-${mem.id}`}
            icon={<Users className="h-5 w-5 text-blue-600" />}
            title={notification.title}
            description={
              mem.email === user.email
                ? `You joined the workspace ${notification.workspace.name}`
                : notification.userId === mem.userId
                  ? `You added ${mem.name} to workspace ${notification.workspace.name}`
                  : `${mem.name} joined the workspace ${notification.workspace.name}`
            }
            time="Today"
            unread
          />
        );
      });
    }

    if (notification.type === "file_uploaded") {
      return (
        <Notification
          key={notification.id}
          icon={<FileText className="h-5 w-5 text-green-600" />}
          title={notification.title}
          description={
            notification.userId === user.id
              ? `You uploaded a document ${notification.document.title} to ${notification.workspace.name}`
              : `Document ${notification.document.title} uploaded to ${notification.workspace.name}`
          }
          time="Today"
          unread
        />
      );
    }

    if (notification.type === "role_updated") 
    {
       return notification.workspace.members.map(mem => {
       
        if (mem.email !== user.email && mem.workspaceId !== notification.workspaceId) return null;

      return (
        <Notification
          key={notification.id}
          icon={<ShieldCheck className="h-5 w-5 text-green-600" />}
          title={notification.title}
 description={
          mem.email === user.email
            ? `Your role was updated to ${mem.role}`
            : notification.userId === mem.userId
              ? `You updated the role of ${mem.name} to ${mem.role}`
              : `${mem.name} role was updated to ${mem.role}`
        }          
        time={NotificationTime(diffTime) || ''}
          unread
        />
      );
    })
    }

    if (
      notification.type === "ai_processing" &&
      notification.userId === user.id
    ) {
      return (
        <Notification
          key={notification.id}
          icon={<Bot className="h-5 w-5 text-blue-600" />}
          title="AI processing completed"
          description={`Document ${notification?.document?.title} is ready for asking questions`}
          time="Today"
          unread
        />
      );
    }

    return null;
  })}

  {userList.length < 1 && (
    <Notification
      icon=""
      title="No Notifications"
      description=""
      time=""
    />
  )}
</Section>







         <Section title="Yesterday">
          {notifications.flatMap(notification =>
  notification.workspace.members.map(mem => {
    const diffTime = date.getTime() - new Date(notification.createdAt).getTime();
    console.log(NotificationTime(diffTime));
  if(NotificationTime(diffTime) !== "Yesterday" ) return;
    if (notification.type === "member_notification") {
      const findUser = userListYes.find(
        user => user.id === mem.id && mem.workspaceId === notification.workspaceId
      );
      if (findUser) return null;
      userListYes.push(mem);


      return <Notification
        key={notification.id + mem.id}
        icon={<Users className="h-5 w-5 text-blue-600" />}
        title={notification.title}
        description={
          mem.email === user.email
            ? `You joined the workspace ${notification.workspace.name}`
            : notification.userId === mem.userId
              ? `You added ${mem.name} to workspace ${notification.workspace.name}`
              : `${mem.name} joined the workspace ${notification.workspace.name}`
        }
        time={NotificationTime(diffTime) || ''}
        unread
      />
    }

    if (notification.type === "file_uploaded") {
      return <Notification
        key={notification.id + mem.id}
        icon={<FileText className="h-5 w-5 text-green-600" />}
        title={notification.title}
        description={
          mem.email === user.email
            ? `Document ${notification.document.title} uploaded  to the workspace ${notification.workspace.name}`
            : notification.userId === mem.userId
              ? `You uploaded document ${notification.document.title} to workspace ${notification.workspace.name}`
              : `Document uploaded to workspace`
        }
        time={NotificationTime(diffTime) || ''}
        unread
      />
    }

    if (notification.type === "role_updated") 
    {
       return notification.workspace.members.map(mem => {
       
        if (mem.email !== user.email && mem.workspaceId !== notification.workspaceId) return null;

      return (
        <Notification
          key={notification.id}
          icon={<ShieldCheck className="h-5 w-5 text-green-600" />}
          title={notification.title}
 description={
          mem.email === user.email
            ? `Your role was updated to ${mem.role}`
            : notification.userId === mem.userId
              ? `You updated the role of ${mem.name} to ${mem.role}`
              : `${mem.name} role was updated to ${mem.role}`
        }          
        time={NotificationTime(diffTime) || ''}
          unread
        />
      );
    })
    }

    if (notification.type === "ai_processing" && notification.userId === user.id) {
      return <Notification
        key={notification.id + mem.id}
        icon={<Bot className="h-5 w-5 text-blue-600" />}
        title="AI processing completed"
          description={`Document ${notification?.document?.title} is ready for asking questions`}
      time={NotificationTime(diffTime) || ''}
        unread
      />
    }

    return null;
  })
)}


      {userListYes.length < 1 &&  <Notification
            icon={''}
            title="No Yesterday Notifications"
            description=""
            time=""
          />
       }

        
       </Section> 

         <Section title="Older">
          {notifications.flatMap(notification =>
  notification.workspace.members.map(mem => {
    const diffTime = date.getTime() - new Date(notification.createdAt).getTime();

  if(NotificationTime(diffTime) !== "Older" ) return;
    if (notification.type === "member_notification") {
      const findUser = userListOld.find(
        user => user.id === mem.id && mem.workspaceId === notification.workspaceId
      );
      if (findUser) return null;
      userListOld.push(mem);


      return <Notification
        key={notification.id + mem.id}
        icon={<Users className="h-5 w-5 text-blue-600" />}
        title={notification.title}
        description={
          mem.email === user.email
            ? `You joined the workspace ${notification.workspace.name}`
            : notification.userId === mem.userId
              ? `You added ${mem.name} to workspace ${notification.workspace.name}`
              : `${mem.name} joined the workspace ${notification.workspace.name}`
        }
        time={NotificationTime(diffTime) || ''}
        unread
      />
    }

    if (notification.type === "file_uploaded") {
      return <Notification
        key={notification.id + mem.id}
        icon={<FileText className="h-5 w-5 text-green-600" />}
        title={notification.title}
        description={
          mem.email === user.email
            ? `Document ${notification.document.title} uploaded to the workspace ${notification.workspace.name}`
            : notification.userId === mem.userId
              ? `You uploaded document ${notification?.document?.title} to workspace ${notification.workspace.name}`
              : `Document uploaded to workspace`
        }
        time={NotificationTime(diffTime) || ''}
        unread
      />
    }

    if (notification.type === "role_updated") 
    {
       return notification.workspace.members.map(mem => {
       
        if (mem.email !== user.email && mem.workspaceId !== notification.workspaceId) return null;

      return (
        <Notification
          key={notification.id}
          icon={<ShieldCheck className="h-5 w-5 text-green-600" />}
          title={notification.title}
 description={
          mem.email === user.email
            ? `Your role was updated to ${mem.role}`
            : notification.userId === mem.userId
              ? `You updated the role of ${mem.name} to ${mem.role}`
              : `${mem.name} role was updated to ${mem.role}`
        }          
        time={NotificationTime(diffTime) || ''}
          unread
        />
      );
    })
    }

    if (notification.type === "ai_processing" && notification.userId === user.id) {
      return <Notification
        key={notification.id + mem.id}
        icon={<Bot className="h-5 w-5 text-blue-600" />}
        title="AI processing completed"
          description={`Document ${notification?.document?.title} is ready for asking questions`}
      time={NotificationTime(diffTime) || ''}
        unread
      />
    }

    return null;
  })
)}


      {userListOld.length < 1 &&  <Notification
            icon={''}
            title="No Older Notifications"
            description=""
            time=""
          />
       }

        
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