/** @format */
import {auth, currentUser} from "@clerk/nextjs"
import Image from "next/image"

export default async function Page() {
  const {userId} = auth()
  if (userId) {
    console.log(userId)
  }

  const user = await currentUser()
  if (user) {
  }

  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between  text-sm flex flex-col gap-6 lg:flex ">
      <div className="w-full flex justify-between">
        <p className="text-xl">Image Page</p>
      </div>
      <div className="w-full">
        <p>{userId}</p>
      </div>
      <Image
        src="https://omarzouichetestbucket.s3.eu-west-3.amazonaws.com/media/GEjbChlW8AAyyri.jpeg"
        width={400}
        height={400}
        alt="aws"
      />
      <div className="w-full overflow-hidden">
        <pre>
          <code>{JSON.stringify(user, null, 4)}</code>
        </pre>{" "}
      </div>
    </div>
  )
}
