/** @format */
import { useEffect } from "react"
import { useShallow } from "zustand/react/shallow"

import { useCardStore } from "@/stores/cards"
import useUiStore from "@/stores/uiStore"

import { motion } from "framer-motion"
import { ContextMenu, ContextMenuTrigger } from "@radix-ui/react-context-menu"
import ImageCard from "../cards/Image"

import Note from "../cards/Note"
import Markdown from "../cards/Markdown"
import Code from "../cards/Code"
import BoardMessage from "@/components/text/BoardMessage"
import BoardContextMenu from "../contextMenus/BoardContextMenu"
import Url from "../cards/Url"
import RND from "../cards/components/RND"
import { Resizable } from "re-resizable"
import NRND from "../cards/new/NRND"

export default function Board() {
  const { zoom, setInsertImageX, setInsertImageY } = useUiStore(
    useShallow((s) => ({
      zoom: s.zoom,
      setInsertImageX: s.setInsertImageX,
      setInsertImageY: s.setInsertImageY,
    }))
  )
  const cards = useCardStore((s) => s.cards)
  const url = useCardStore((s) => s.url)
  // useInitBoard()

  const handleOpenChange = (e) => {
    setInsertImageX(e.nativeEvent.clientX)
    setInsertImageY(e.nativeEvent.clientY)
  }
  // const boardMotionDivProps = {
  //   // onPointerDown: handleOpenChange,
  //   id: "board",
  //   tabIndex: -1,
  //   animate: {
  //     scale: zoom,
  //   },
  //   transition: {
  //     // type: "",
  //     ease: "anticipate",
  //     delay: 0,
  //     duration: 0,
  //   },
  //   className: "focus:outline-none absolute z-10 pointer-events-auto",
  // }

  console.log(cards)

  const boardMotionDivProps = {
    // onPointerDown: handleOpenChange,
    id: "board",
    tabIndex: -1,
    // className: "focus:outline-none absolute z-10 pointer-events-auto",
    className: "focus:outline-none z-10 pointer-events-auto",
  }

  // le context menu ?? pas obligé de wrap le tout autour de board
  // mais d'abord faut améliorer la scroll
  /*TODO:
  * rendre le Resizable draggable
  * */
  return (
    <>
      <BoardMessage />
      <NRND />
      {/*
      {cards &&
        Object.keys(cards).map((item) => {
          if (cards[item].type === "note") {
            return <Note key={cards[item].id} data={cards[item]} />
          } else if (cards[item].type === "code") {
            return <Code key={cards[item].id} data={cards[item]} />
          } else if (cards[item].type === "markdown") {
            return (
              <Markdown
                key={cards[item].id}
                card={cards[item]}
                id={cards[item].id}
              />
            )
          } else if (cards[item].type === "image") {
            return <ImageCard key={cards[item].id} id={cards[item].id} />
          } else if (cards[item].type === "url") {
            return <Url key={cards[item].id} id={cards[item].id} />
          }
        })}
        */}
    </>
  )
}
