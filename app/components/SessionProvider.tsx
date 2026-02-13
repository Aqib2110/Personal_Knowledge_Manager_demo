"use client"
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import ContentWrapper from './ContentWrapper'
const SessionProvid = ({ children }: { children: React.ReactNode }) => {
  return (
   
        <SessionProvider>
          <ContentWrapper>
          {children}
          </ContentWrapper> 
          </SessionProvider>
  
  )
}

export default SessionProvid
