/** @format */

import Image from "next/image"
import Layout from "./Layout"
import Hero from "./Hero"
import {NoteCard, CodeCard, UrlCard} from "./Cards"
import Illustrations from "./Illustrations"
import {Button} from "../ui/button"
import {EnvelopeClosedIcon, GitHubLogoIcon} from "@radix-ui/react-icons"

export default function HomePage() {
  return (
    <>
      <Layout>
        <Hero />
        <Illustrations />
        <div className="dark:bg-accent flex flex-col gap-6 rounded p-10">
          <span className="text-2xl">start using your now !</span>
          <Button variant="default" className="text-3xl p-10">
            Sign Up
          </Button>
        </div>
      </Layout>
      <footer className="flex justify-center gap-6">
        <div className="flex gap-1 align-center select-none opacity-45 hover:opacity-70 transition-all duration-200">
          <EnvelopeClosedIcon className="w-4 h-full " />
          <span className=" h-fit">contact</span>
        </div>
        <div className="flex gap-1 align-center select-none opacity-45 hover:opacity-70 transition-all duration-200">
          <GitHubLogoIcon className="w-4 h-full " />
          <span className=" h-fit">github</span>
        </div>
      </footer>
    </>
  )
}
