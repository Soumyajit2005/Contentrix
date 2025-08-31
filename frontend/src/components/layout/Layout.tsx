'use client'

import { ReactNode } from 'react'
import Header from './Header'
import { Toaster } from 'react-hot-toast'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>{children}</main>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            style: {
              background: '#4ade80',
              color: '#000',
            },
          },
        }}
      />
    </div>
  )
}

export default Layout