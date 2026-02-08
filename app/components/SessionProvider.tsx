"use client"
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import ContentWrapper from './ContentWrapper'
const SessionProvid = ({ children }: { children: React.ReactNode }) => {
  return (
    <ContentWrapper>
        <SessionProvider>{children}</SessionProvider>
   </ContentWrapper> 
  )
}

export default SessionProvid
