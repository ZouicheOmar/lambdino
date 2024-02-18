/** @format */

import {useCardStore} from "@/stores/cards"
import {AllSidesIcon, GlobeIcon} from "@radix-ui/react-icons"
import {motion} from "framer-motion"
import {Button} from "../ui/button"

import useUrl from "./url/useUrl"

export default function Url(props) {
  const {id} = props

  const {handleKeyDown, handleSubmit, handleInvalid, loading, valid, divScope} =
    useUrl(id)

  const cards = useCardStore((s) => s.cards)
  const setData = useCardStore((s) => s.setData)
  const putOnTop = useCardStore((s) => s.putOnTop)

  const {href, title, description, favicon} = cards[id]

  return (
    <motion.div
      ref={divScope}
      drag
      dragMomentum={false}
      className="absolute w-fit h-fit cursor-default drop-shadow"
      // onPointerDown={putOnTop}
    >
      {!valid ? (
        <div className="relative w-[300px] h-fit bg-card rounded-md pr-2  border animate-in fade-in-30 animate-out fade-out-30">
          <form
            onSubmit={handleSubmit}
            onInvalid={handleInvalid}
            className="w-full px-2"
          >
            <input
              type="url"
              pattern="https://.*"
              value={href}
              size={30}
              onChange={(e) => setData(id, {href: e.target.value})}
              onKeyDown={handleKeyDown}
              required
              className="w-full bg-transparent h-[2rem] outline-none"
              autoFocus
            />

            <Button
              className="absolute right-4 top-[80%] w-[4rem] h-[1.5rem] py-0  disabled:text-neutral-600 disabled:opacity-1 "
              disabled={!href && true}
              type="submit"
            >
              {loading ? <AllSidesIcon className="animate-spin" /> : "validate"}
            </Button>
          </form>
        </div>
      ) : (
        <div
          className="relative select-none max-w-[300px] flex  p-1 gap-1 bg-card rounded-md overflow-hidden border "
          id={id}
        >
          {favicon ? (
            <img
              src={favicon}
              className="rounded-lg pointer-events-none -[2rem] size-[2rem]"
              alt="favicon"
              aria-hidden
              onError={() => setData(id, {favicon: ""})}
            />
          ) : (
            <GlobeIcon className="size-[2rem] cursor-grab" />
          )}
          <a
            href={href}
            target="_blank"
            className="max-w-[300px] min-h-full  flex flex-col "
          >
            <p className="grow text-start w-fit max-w-[300px]  leading-none truncate transition-all duration-300">
              {title}
            </p>
            {description && (
              <p className="text-xs text-start  truncate max-w-full  transition-all duration-300">
                {description}
              </p>
            )}
          </a>
        </div>
      )}
    </motion.div>
  )
}
