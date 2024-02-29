/** @format */

import Image from "next/image"
import Layout from "./Layout"
import Hero from "./Hero"
import {NoteCard, CodeCard, UrlCard} from "./Cards"
import Illustrations from "./Illustrations"
import {Button} from "../ui/button"
import {EnvelopeClosedIcon, GitHubLogoIcon} from "@radix-ui/react-icons"
import Footer from "../Footer"

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
      <Footer />
    </>
  )
}
