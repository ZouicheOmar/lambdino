/** @format */

import {useAuth} from "@clerk/nextjs"
import {Button} from "@/components/ui/button"

export default function LogOutButton() {
  const {signOut} = useAuth()

  return <Button onPointerDown={() => signOut()}>Sign out</Button>
}
