/** @format */

import {useEffect} from "react"
import {useShallow} from "zustand/react/shallow"

import {useCardStore} from "@/stores/cards"

import {motion, AnimatePresence} from "framer-motion"
import {openDrawer} from "@/utils/positions"

export default function BoardMessage() {
  const {cards, message, setMessage, fileName} = useCardStore(
    useShallow((s) => ({
      cards: s.cards,
      message: s.message,
      setMessage: s.setMessage,
      fileName: s.fileName,
    }))
  )

  useEffect(() => {
    if (fileName === "") {
      setMessage("please select a board")
    } else {
      if (Object.entries(cards).length === 0) {
        setMessage("no cards")
      } else {
        setMessage("")
      }
    }
  })

  return (
    <AnimatePresence>
      {message !== "" && (
        <motion.div
          className="absolute flex flex-col justify-start w-[20rem]"
          initial={{x: -10, opacity: 0}}
          animate={{x: 0, opacity: 1}}
          exit={{x: -10, opacity: 0}}
          transition={{duration: 0.3}}
        >
          <p className="text-sm text-start w-fit">
            {`Current board : ${fileName === "" ? "none" : fileName}`}
            <br />
            {message}
          </p>
          {fileName === "" && (
            <p
              className="mt-10 brightness-[0.25] cousine-font text-sm text-start w-fit rounded hover:bg-neutral-700 p-2 cursor-pointer"
              onPointerDown={openDrawer}
            >
              {" "}
              press ctrl + G
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
