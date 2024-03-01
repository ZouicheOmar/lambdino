/** @format */

import Footer from "@/components/Footer"
import {SignIn} from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="p-10 md:p-0 grid grid-cols-1 place-items-center h-screen">
      <SignIn />
      <Footer />
    </div>
  )
}
