/** @format */
import {useEffect} from "react"

import Editor from "react-simple-code-editor"

import {useCardStore} from "@/stores/cards"

import RND from "./components/RND"
import CardHeader from "./components/Header"
import TopIcons from "./components/TopIcons"
import BottomIcons from "./components/BottomIcons"

// import "../../../node_modules/prismjs/components/prism-clike"
// import "../../../node_modules/prismjs/components/prism-javascript"
// import "../../../node_modules/prismjs/components/prism-python"
// import "../../../node_modules/prismjs/themes/prism.css"

import {highlight, languages} from "prismjs"
import "@/node_modules/prismjs/components/prism-clike"
import "@/node_modules/prismjs/components/prism-javascript"
import "@/node_modules/prismjs/components/prism-python"
import "@/node_modules/prismjs/themes/prism-okaidia.css"

const Body = (props) => {
  const {card} = props
  const {id, data} = card
  const {code} = data
  const setData = useCardStore((state) => state.setData)

  return (
    <Editor
      textareaId={`${id}-textarea`}
      value={code}
      onValueChange={(code) => setData(id, code)}
      // highlight={(code) => highlight(code, languages.extend("javascript"))}
      highlight={(code) => highlight(code, languages.js)}
      padding={8}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 13,
      }}
      onBlur={() => setData(id, code)}
      className="grow nondrag h-full active:ring-indigo-500 focus:ring-indigo-500  active:ring-[1px] transition-all"
      textareaClassName="transition-colors  duration-300 active:bg-indigo-500/15   "
    />
  )
}

export default function Code(props) {
  const {data} = props
  const {id, title} = data

  return (
    <RND id={id}>
      <div className="w-full h-full select-none border flex flex-col fade-in slide-in-from-top-5 duration-300 bg-card rounded-md">
        <CardHeader
          id={id}
          title={title}
          variant="noteAndCode"
          size="noteAndCode"
        />
        <Body card={data} />
        <TopIcons id={id} />
        <BottomIcons id={id} />
      </div>
    </RND>
  )
}
