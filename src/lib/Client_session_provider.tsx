"use client"
import React from 'react'
import { SessionProvider } from 'next-auth/react'
const Client_session_provider = ({children}:{children:React.ReactNode}) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default Client_session_provider