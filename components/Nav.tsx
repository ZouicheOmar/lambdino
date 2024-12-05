/** @format */
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import SideNav from "./SideNav"

type NavLinkProps = {
  href: string
  text: string
}

const NavLink = (props: NavLinkProps) => {
  const { href, text } = props
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
        width={120}
        height={10}
        priority
      />
    </Link>
  )
}

export default function Nav() {

  return (
    <div className="w-full flex justify-between ">
      <HomeButton />
      <SideNav />
      <div className="hidden md:flex w-fit  gap-6 text-sm">
        <NavLink href="/about" text="About" />
      </div>
    </div>
  )
}
