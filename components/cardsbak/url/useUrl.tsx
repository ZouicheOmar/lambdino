/** @format */
import axios from "axios"

import {useState, useEffect} from "react"
import {useCardStore} from "@/stores/cards"
import {useAnimate} from "framer-motion"

type faviconItem = {
  href: string
  sizes: string
  rel: string
  type: string
}

const getBaseUrl = (str: string) => {
  const cible = "/"
  let includes = str.includes(cible)
  let index = str.indexOf(cible)
  let lastindex = 0
  let n = 0
  let baseUrl = ""
  while (includes) {
    includes = str.includes(cible, index + 1)
    lastindex = index
    index = str.indexOf(cible, lastindex) + 1
    n += 1
    if (n === 4) {
      lastindex
      baseUrl = str.slice(0, lastindex)
      return baseUrl
    }
  }
}

const formatUrl = (faviconHref: string, url: string) => {
  let faviconurl = ""
  if (faviconHref.indexOf("/") === 0) {
    faviconHref = faviconHref.replace("/", "")
  }
  if (faviconHref.includes("http") || faviconHref.includes("https")) {
    return faviconurl
  } else {
    const baseUrl = getBaseUrl(url)
    console.log("faviconhref : ", baseUrl + faviconHref)
    return baseUrl + faviconHref
  }
}

const getFaviconFromMetaData = (favicons: faviconItem[], href: string) => {
  let faviconHref = ""
  console.log(href)
  console.log("favicons", favicons)
  if (favicons) {
    for (let i = 0; i < favicons.length; i++) {
      if (favicons[i].rel === "icon" && favicons[i].sizes === "32x32") {
        faviconHref = formatUrl(favicons[i].href, href)
        break
      }
      if (favicons[i].rel === "icon") {
        faviconHref = formatUrl(favicons[i].href, href)
      }
    }
  }
  return faviconHref
}

export default function useUrl(id) {
  const setData = useCardStore((s) => s.setData)
  const cards = useCardStore((s) => s.cards)
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
      .post(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/handleUrl`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const {title, favicons, description} = res.data
        console.log("all of res url metadata", res.data)
        console.log("description", description)
        const faviconHref = getFaviconFromMetaData(favicons, href)
        setData(id, {
          title: title,
          description: description,
          favicon: faviconHref,
          already_added: true,
        })
        setValid(true)
        console.log({
          title: title,
          description: description,
          favicon: faviconHref,
          already_added: true,
        })
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
      })
  }

  const handleInvalid = () => {
    setData(id, {href: ""})
  }

  return {handleKeyDown, handleSubmit, handleInvalid, loading, valid, divScope}
}
