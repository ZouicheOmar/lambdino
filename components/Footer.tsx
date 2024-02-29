/** @format */
import {EnvelopeClosedIcon, GitHubLogoIcon} from "@radix-ui/react-icons"

export default function Footer() {
  return (
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
  )
}
