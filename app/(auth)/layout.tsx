/** @format */

import AuthNav from "@/components/AuthNav"
import Panel from "@/components/Panel/Panel"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // <div className="absolute w-screen h-screen bg-red-900/10">
    //   <AuthNav />
    //   <Panel />
    //   {children}
    // </div>
    <>{children}</>
  )
}
