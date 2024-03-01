/** @format */
"use client"
import {useState} from "react"
import {useRouter} from "next/navigation"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"

import Link from "next/link"

import {HamburgerMenuIcon} from "@radix-ui/react-icons"
import {Button} from "./ui/button"

export default function SideNav() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const handleSelect = (route: string) => {
    router.push(route)
    setOpen(false)
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <HamburgerMenuIcon className="md:hidden w-4 h-full scale-125" />
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-2 pt-16">
        <Button onPointerDown={() => handleSelect("/sign-up")}>Sign Up</Button>
        <Button onPointerDown={() => handleSelect("/sign-in")}>Sign In</Button>
        <Button onPointerDown={() => handleSelect("/about")}>About</Button>
      </SheetContent>
    </Sheet>
  )
}
