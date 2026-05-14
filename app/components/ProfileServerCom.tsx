import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import Profile from './Profile'
import { redirect } from 'next/navigation'

const ProfileServerCom = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div>
      <Profile session={session} />
    </div>
  )
}

export default ProfileServerCom