/** @format */

import Link from "next/link"
import {ClerkProvider} from "@clerk/nextjs"

import {currentUser, UserButton} from "@clerk/nextjs"

import type {Metadata} from "next"
import {Inter} from "next/font/google"
import "./globals.css"

const inter = Inter({subsets: ["greek"]})

export const metadata: Metadata = {
  title: "Lambda",
  description:
    "An app to test aws lambda functions and integrate them in a Nextjs app",
}

async function Navbar() {
  const user = await currentUser()

  return (
    <div className="w-full flex justify-between ">
      <Link href="/" className="text-xl">
        {" "}
        Lambdino
      </Link>
      {!user && (
        <div className="w-fit flex gap-6">
          <Link
            href="/sign-in"
            className="ring-[1px] ring-neutral-800 rounded px-2 py-1 hover:bg-neutral-900 transition-colors duration-200"
          >
            sign in
          </Link>
          <Link
            href="/sign-up"
            className="ring-[1px] ring-neutral-800 rounded px-2 py-1 hover:bg-neutral-900 transition-colors duration-200"
          >
            sign up
          </Link>
        </div>
      )}
      {user && <UserButton afterSignOutUrl="/" />}
    </div>
  )
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
          <main className="flex max-h-screen flex-col items-center justify-between p-24 gap-10">
            <Navbar />
            {children}
          </main>
          <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"></div>
        </body>
      </html>
    </ClerkProvider>
  )
}
