/** @format */

import {useShallow} from "zustand/react/shallow"

// import { useCardStore } from "@/stores/cards";

import {Tags} from "@/components/text/Tags"
import {ChevronIcon, ResizeIcon} from "@/components/Icons"

export default function BottomIcons(props) {
  const {id} = props
  //    const { cards, toggleFoldCard } = useCardStore(
  //       useShallow((s) => ({
  //          cards: s.cards,
  //          toggleFoldCard: s.toggleFoldCard,
  //       }))
  //    );

  //    const { folded, tags } = cards[id];
  const folded = true

  return (
    <div className="flex-none w-full flex grow-0  justify-between items-end bg-none rounded-b h-6">
      <button
        id={`${id}-foldButton`}
        className={`max-h-fit max-w-fit flex-none  hover:cursor-pointer transition-transform duration-100
                 ${folded ? "rotate-180" : "rotate-0"}
                 `}
        // onPointerDown={() => toggleFoldCard(id)}
      >
        <ChevronIcon className="fill-neutral-500 hover:fill-neutral-400 " />{" "}
      </button>
      {/* <Tags tags={tags} /> */}

      <ResizeIcon className="scale-75 flex-none fill-neutral-600" />
    </div>
  )
}
