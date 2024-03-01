/** @format */

import type {Metadata} from "next"
import {ClerkProvider, currentUser} from "@clerk/nextjs"

import {ThemeProvider} from "@/components/theme-provider"
import {Inter} from "next/font/google"
import "./globals.css"

const inter = Inter({subsets: ["greek"]})

export const metadata: Metadata = {
  title: "Mess Board",
  description:
    "Mess Board is is digital canvas for your notes, images and code snippets. Create cards filled with text, code snippets, markdown, images, and URLs, scattered freely across the board. Drag and drop them to arrange",
}

export default async function RootLayout({
  children,
  board,
  home,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await currentUser()

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <main className="flex min-h-screen min-w-screen flex-col ">
              {user ? board : home}
              {/* {board} */}
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
