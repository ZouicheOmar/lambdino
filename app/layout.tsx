/** @format */

import type {Metadata} from "next"
import {ClerkProvider, currentUser} from "@clerk/nextjs"

import {ThemeProvider} from "@/components/theme-provider"
import {Inter} from "next/font/google"
import "./globals.css"

const inter = Inter({subsets: ["greek"]})

export const metadata: Metadata = {
  title: "Lambda",
  description:
    "An app to test aws lambda functions and integrate them in a Nextjs app",
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
            <main className="flex h-screen flex-col  gap-10">
              {user ? board : home}
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
