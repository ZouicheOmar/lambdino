/** @format */

import type { Metadata } from "next"

import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
import "./globals.css"
import React from "react"

const inter = Inter({ subsets: ["greek"] })

export const metadata: Metadata = {
  title: "Mess Board",
  description:
    "Mess Board is is digital canvas for your notes, images and code snippets. Create cards filled with text, code snippets, markdown, images, and URLs, scattered freely across the board. Drag and drop them to arrange",
}

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex min-h-screen min-w-screen flex-col ">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
