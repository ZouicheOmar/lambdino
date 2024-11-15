/** @format */

import { currentUser, UserButton } from "@clerk/nextjs"
import Link from "next/link"

type NavLinkeProps = {
  href: string
  text: string
}

const NavLink = (props: NavLinkeProps) => {
  const { href, text } = props
  return (
    <Link
      href={href}
      className="ring-[1px] ring-neutral-800 rounded px-2 py-1 hover:bg-neutral-900 transition-colors duration-200"
    >
      {text}
    </Link>
  )
}

export default async function AuthNav() {
  const user = await currentUser()

  return (
    <div className="w-full flex justify-between ">
      <span className="text-xl"> BOARD NAME</span>
      <div className="w-fit flex gap-6 text-sm">
        <NavLink href="/" text="select board" />
        {user && <UserButton afterSignOutUrl="/" />}
      </div>
    </div>
  )
}
