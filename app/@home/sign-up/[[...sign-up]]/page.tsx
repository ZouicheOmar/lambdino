/** @format */

import {SignUp} from "@clerk/nextjs"
import Footer from "@/components/Footer"

export default function Page() {
  return (
    <div className="p-10 md:p-0 grid grid-cols-1 place-items-center h-screen">
      <SignUp />
      <Footer />
    </div>
  )
}
