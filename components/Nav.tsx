/** @format */

import {UserButton, useUser} from "@clerk/nextjs"
import Link from "next/link"
import {usePathname} from "next/navigation"
import {useEffect} from "react"
import Image from "next/image"

type NavLinkProps = {
  href: string
  text: string
}

const NavLink = (props: NavLinkProps) => {
  const {href, text} = props
  return (
    <Link href={href} className="px-2 py-1 transition-colors duration-200">
      {text}
    </Link>
  )
}

const HomeButton = () => {
  return (
    <Link href="/">
      <Image
        className="relative h-fit dark:drop-shadow-[0.5rem_0_0.5rem_#64748b75] light:invert"
        src="/logo.svg"
        alt="Mess board Logo"
        width={100}
        height={10}
        priority
      />
    </Link>
  )
}

export default function Nav() {
  const {isLoaded, isSignedIn, user} = useUser()
  const pathname = usePathname()

  useEffect(() => {
    console.log("pathname ", pathname)
  }, [])

  return (
    <div className="w-full flex justify-between ">
      {/* <Link href="/" className="text-xl">
        {" "}
        Lambdino
      </Link> */}
      <HomeButton />
      <div className="w-fit flex  gap-6 text-sm">
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
