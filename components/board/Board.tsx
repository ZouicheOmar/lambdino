/** @format */
import {cards} from "@/lib/cards"

import {ContextMenu, ContextMenuTrigger} from "@radix-ui/react-context-menu"
import {motion} from "framer-motion"

import Note from "../cards/Note"
import Markdown from "../cards/Markdown"
import Code from "../cards/Code"
import BoardMessage from "@/components/text/BoardMessage"

export default function Board() {
  /**
     * 
    const cards = useCardStore((s) => s.cards);
    const { zoom, setInsertImageX, setInsertImageY } = useUiStore(
       useShallow((s) => ({
          zoom: s.zoom,
          setInsertImageX: s.setInsertImageX,
          setInsertImageY: s.setInsertImageY,
       }))
    );
 
    useInitBoard();
 
    const handleOpenChange = (e) => {
       setInsertImageX(e.nativeEvent.clientX);
       setInsertImageY(e.nativeEvent.clientY);
    };
     */

  const boardMotionDivProps = {
    // onPointerDown: handleOpenChange,
    id: "board",
    tabIndex: -1,
    // animate: {
    //   scale: zoom,
    // },
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
      {/* <ContextMenu>
        <ContextMenuTrigger
          id="boardWrapper"
          className="w-full h-full relative p-0"
        >
          <motion.div {...boardMotionDivProps}>
            <BoardMessage />
            {cards &&
              Object.keys(cards).map((item) => {
                if (cards[item].type === "note") {
                  return <NoteCard key={cards[item].id} data={cards[item]} />
                } else if (cards[item].type === "code") {
                  return <CodeCard key={cards[item].id} data={cards[item]} />
                } else if (cards[item].type === "markdown") {
                  return (
                    <MarkdownCard
                      key={cards[item].id}
                      card={cards[item]}
                      id={cards[item].id}
                    />
                  )
                } else if (cards[item].type === "image") {
                  return <ImageCard key={cards[item].id} id={cards[item].id} />
                } else {
                  return <></>
                }
              })}
          </motion.div>
          <BoardContextMenu />
        </ContextMenuTrigger>
      </ContextMenu> */}
      <ContextMenu>
        <ContextMenuTrigger
          id="boardWrapper"
          className="w-full h-full relative p-0"
        >
          <motion.div {...boardMotionDivProps}>
            <BoardMessage />
            {cards &&
              Object.keys(cards).map((item, index) => {
                if (cards[item].type === "note") {
                  return <Note key={index} data={cards[item]} />
                }
                // if (cards[item].type === "markdown") {
                //   return <Markdown key={index} card={cards[item]} />
                // }
                // if (cards[item].type === "code") {
                //   return <Code key={index} data={cards[item]} />
                // }
                else {
                  return <></>
                }
              })}
          </motion.div>
          {/* <BoardContextMenu /> */}
        </ContextMenuTrigger>
      </ContextMenu>
    </>
  )
}

const NoteTest = (props: {data: string}) => {
  const {data} = props

  return (
    <motion.div
      className="border rounded w-64 h-64 bg-background  leading-none p-6"
      drag
    >
      {data.data}
    </motion.div>
  )
}
