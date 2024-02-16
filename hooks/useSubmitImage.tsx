/** @format */
import {useState} from "react"
import axios from "axios"
import {v4 as uuidv4} from "uuid"

import {getImageSignedUrl} from "@/utils/getImageSignedUrl"

import useUiStore from "@/stores/uiStore"
import {useCardStore} from "@/stores/cards"

import {AXIOS_FORMDATA_CONFIG} from "@/lib/constants"
import {useUserStore} from "@/stores/user"

export default function useSubmitImage() {
  const [file, setFile] = useState()
  const addImageCard = useCardStore((s) => s.addImageCard)
  const toggleInsertImageDialogOpen = useUiStore(
    (s) => s.toggleInsertImageDialogOpen
  )
  const userId = useUserStore((s) => s.userId)
  const openBoard = useCardStore((s) => s.openBoard)

  const submit = async (e) => {
    e.preventDefault()

    const fd = new FormData()
    fd.append("image", file)
    const type = file.type

    const id = uuidv4().toString()
    const fileName = `${userId}_${openBoard}_${id}`
    const url = await getImageSignedUrl(type, fileName)

    if (url) {
      const result = await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      })
      if (result.status === 200) {
        addImageCard(id)
        toggleInsertImageDialogOpen(false)
      }
    }
  }

  return {setFile, submit}
}
