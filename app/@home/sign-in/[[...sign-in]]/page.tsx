/** @format */

import {SignIn} from "@clerk/nextjs"

export default function Page() {
  return (
    <div className=" grid grid-cols-1 place-items-center ">
      <SignIn />
    </div>
  )
}
