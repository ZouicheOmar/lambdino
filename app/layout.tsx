/** @format */

import type {Metadata} from "next"

import {ClerkProvider} from "@clerk/nextjs"

import Nav from "@/components/Nav"

import {ThemeProvider} from "@/components/theme-provider"
import {Inter} from "next/font/google"
import "./globals.css"

const inter = Inter({subsets: ["greek"]})

export const metadata: Metadata = {
  title: "Lambda",
  description:
    "An app to test aws lambda functions and integrate them in a Nextjs app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
            <main className="flex h-screen flex-col  gap-10 ">{children}</main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
