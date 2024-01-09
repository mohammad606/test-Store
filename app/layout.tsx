import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SessionProvider from "@/app/SessionProvider";
import {Providers} from "./nextUiProvider"
import { Analytics } from '@vercel/analytics/react';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Store',
  description: 'Generated by Mohammad Al Halabi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {



  return (
      <html lang="en">
      <body className={inter.className}>

             {children}
 
      <Analytics />
      </body>
      </html>
  )

}

















