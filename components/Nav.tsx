/** @format */

import {UserButton, useUser} from "@clerk/nextjs"
import Link from "next/link"

type NavLinkProps = {
  href: string
  text: string
}

const NavLink = (props: NavLinkProps) => {
  const {href, text} = props
  return (
    <Link
      href={href}
      className="ring-[1px] ring-neutral-800 rounded px-2 py-1 hover:bg-neutral-900 transition-colors duration-200"
    >
      {text}
    </Link>
  )
}

export default function Nav() {
  const {isLoaded, isSignedIn, user} = useUser()

  return (
    <div className="w-full flex justify-between ">
      <Link href="/" className="text-xl">
        {" "}
        Lambdino
      </Link>
      <div className="w-fit flex gap-6 text-sm">
        <NavLink href="/about" text="about" />
        {!user && (
          <>
            <NavLink href="/sign-in" text="Sign In" />
            <NavLink href="/sign-up" text="Sign Up" />
          </>
        )}
        {user && <UserButton afterSignOutUrl="/" />}
      </div>
    </div>
  )
}
