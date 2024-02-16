/** @format */
import {useEffect} from "react"
import {useAuth} from "@clerk/nextjs"

import {useCardStore} from "@/stores/cards"
import {useUserStore} from "@/stores/user"

export default function useInitBoard() {
  const setBoardsList = useCardStore((s) => s.setBoardsList)

  const setUserId = useUserStore((s) => s.setUserId)
  const {userId: clerkUserId} = useAuth()

  useEffect(() => {
    if (clerkUserId) {
      setUserId(clerkUserId)
      setBoardsList(clerkUserId)
    }
  }, [clerkUserId])
}
