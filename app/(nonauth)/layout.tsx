/** @format */
"use client"
import Nav from "@/components/Nav"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="w-full h-full p-24 ">
      <Nav />
      {children}
    </div>
  )
}
