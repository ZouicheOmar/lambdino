/** @format */

import {useState, useEffect} from "react"
import {useCardStore} from "@/stores/cards"
import {
  AllSidesIcon,
  DragHandleDots1Icon,
  GlobeIcon,
} from "@radix-ui/react-icons"
import {motion, useAnimate, useDragControls} from "framer-motion"
import {Button} from "../ui/button"
import axios from "axios"

export default function Url(props) {
  /**
   * 1. validate url input
   * 2. once url (i.e on submit) is here, fetch url metadata. //fetch (domain/api/handleUrl)
   * 3. get the necessary data and create a new cards of type url
   */
  const {id} = props
  const cards = useCardStore((s) => s.cards)
  const setData = useCardStore((s) => s.setData)
  const putOnTop = useCardStore((s) => s.putOnTop)

  const {position, href, title, description, favicon, already_added} = cards[id]

  const [loading, setLoading] = useState(false)
  const [valid, setValid] = useState(false)

  const [divScope, animate] = useAnimate()

  useEffect(() => {
    animate(divScope.current, {
      x: position.left,
      y: position.top,
    })
    already_added && setValid(true)
  }, [])

  const data = JSON.stringify({
    url: href,
    urlt: "https://nextjs.org/docs/app/",
  })

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      e.target.blur()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    axios
      .post(`http://localhost:3000/api/handleUrl`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const {title, favicons, description} = res.data
        let faviconUrl = ""
        if (favicons) {
          for (let i = 0; i < favicons.length; i++) {
            console.log(favicons[i])
            if (favicons[i].rel === "icon" && favicons[i].sizes === "32x32") {
              faviconUrl = favicons[i].href
            } else if (favicons[i].rel === "icon") {
              faviconUrl = favicons[i].href
            }
          }
        }
        setData(id, {
          title: title,
          description: description,
          favicon: faviconUrl,
          already_added: true,
        })
        setValid(true)
        const el = document.getElementById(id)
        console.log(el)
      })
      .catch((err) => {
        console.log(err?.response?.status)
        if (err?.response?.status === 500) {
          console.log("in this erro")
          handleInvalid()
        }
      })
      .finally(() => {
        setLoading(false)
        const el = document.getElementById(id)
        console.log(el)
      })
  }

  const handleInvalid = () => {
    setData(id, {href: ""})
  }

  return (
    <motion.div
      ref={divScope}
      drag
      dragMomentum={false}
      className=" cursor-default drop-shadow-2xl"
    >
      {!valid ? (
        <div className="relative min-w-fit h-fit bg-neutral-900 rounded pr-2  ring-[1px] ring-neutral-600 animate-in fade-in-30 animate-out fade-out-30">
          <form
            onSubmit={handleSubmit}
            onInvalid={handleInvalid}
            className="w-full px-2"
          >
            <input
              type="url"
              pattern="https://.*"
              // value={value}
              value={href}
              //    size={value ? value.length : 1}
              size={30}
              // onChange={(e) => setValue(e.target.value)}
              onChange={(e) => setData(id, {href: e.target.value})}
              onKeyDown={handleKeyDown}
              required
              className="w-full bg-transparent h-[2rem] outline-none"
              autoFocus
            />

            <Button
              className="absolute right-4 top-[80%] w-[4rem] h-[1.5rem] py-0 disabled:bg-neutral-900 disabled:text-neutral-600 disabled:opacity-1 bg-cyan-900 hover:bg-cyan-700"
              // disabled={!value && true}
              disabled={!href && true}
              type="submit"
            >
              {loading ? <AllSidesIcon className="animate-spin" /> : "validate"}
            </Button>
          </form>
        </div>
      ) : (
        <div
          className="relative select-none max-w-fit flex items-start p-1 gap-1 bg-neutral-800 rounded-md overflow-hidden ring-[1px] ring-neutral-700 animate-in fade-in-30"
          id={id}
        >
          {/* {src ? ( */}
          {favicon ? (
            <div className="size-[2rem] cursor-grab bg-white/50 grid place-items-center rounded-lg p-1 ">
              <img
                // src={src}
                src={favicon}
                className="rounded-lg pointer-events-none "
                alt="favicon"
                aria-hidden
                onError={() => setData(id, {favicon: ""})}
              />
            </div>
          ) : (
            <GlobeIcon className="size-[2rem] text-neutral-400 cursor-grab" />
          )}
          <a
            // href={value}
            href={href}
            target="_blank"
            className="max-w-[300px] h-full [&:hover>*]:text-neutral-100  "
          >
            <p className=" text-start w-fit max-w-[300px] leading-none truncate text-neutral-300 transition-all duration-300">
              {title}
            </p>
            <p className="text-xs text-start text-neutral-400 truncate max-w-full  transition-all duration-300">
              {description}
            </p>
          </a>
        </div>
      )}
    </motion.div>
  )
}
