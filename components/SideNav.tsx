/** @format */

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import Link from "next/link"

import {HamburgerMenuIcon} from "@radix-ui/react-icons"
import {Button} from "./ui/button"

export default function SideNav() {
  return (
    <Sheet>
      <SheetTrigger>
        <HamburgerMenuIcon className="md:hidden w-4 h-full scale-125" />
      </SheetTrigger>
      <SheetContent className="pt-16">
        <div className="flex flex-col gap-2">
          <Button>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
          <Button>
            <Link href="/sign-up">Sign In</Link>
          </Button>
          <Button>
            <Link href="/about">About</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
