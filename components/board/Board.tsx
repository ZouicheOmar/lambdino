/** @format */
import {useEffect} from "react"
import {useShallow} from "zustand/react/shallow"

import {useCardStore} from "@/stores/cards"
import useUiStore from "@/stores/uiStore"

import {motion} from "framer-motion"
import {ContextMenu, ContextMenuTrigger} from "@radix-ui/react-context-menu"

import Note from "../cards/Note"
import Markdown from "../cards/Markdown"
import Code from "../cards/Code"
import BoardMessage from "@/components/text/BoardMessage"

export default function Board() {
  const {zoom, setInsertImageX, setInsertImageY} = useUiStore(
    useShallow((s) => ({
      zoom: s.zoom,
      setInsertImageX: s.setInsertImageX,
      setInsertImageY: s.setInsertImageY,
    }))
  )
  const cards = useCardStore((s) => s.cards)

  // useInitBoard()

  const handleOpenChange = (e) => {
    setInsertImageX(e.nativeEvent.clientX)
    setInsertImageY(e.nativeEvent.clientY)
  }
  const boardMotionDivProps = {
    // onPointerDown: handleOpenChange,
    id: "board",
    tabIndex: -1,
    animate: {
      scale: zoom,
    },
    transition: {
      // type: "",
      ease: "anticipate",
      delay: 0,
      duration: 0,
    },
    className: "focus:outline-none absolute z-10 pointer-events-auto",
  }

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger
          id="boardWrapper"
          className="w-full h-full relative p-0"
        >
          <motion.div {...boardMotionDivProps}>
            <BoardMessage />
            {cards &&
              Object.keys(cards).map((item) => {
                if (cards[item].type === "note") {
                  return <Note key={cards[item].id} data={cards[item]} />
                }
                if (cards[item].type === "code") {
                  return <Code key={cards[item].id} data={cards[item]} />
                }
                if (cards[item].type === "markdown") {
                  return (
                    <Markdown
                      key={cards[item].id}
                      card={cards[item]}
                      id={cards[item].id}
                    />
                  )
                }
                //else if (cards[item].type === "image") {
                //   return <Image key={cards[item].id} id={cards[item].id} />
                // }
              })}
          </motion.div>
          {/* <BoardContextMenu /> */}
        </ContextMenuTrigger>
      </ContextMenu>
    </>
  )
}
