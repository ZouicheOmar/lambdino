/** @format */
"use client"
import {useState} from "react"
import Editor from "react-simple-code-editor"

import Image from "next/image"

import {highlight, languages} from "prismjs"

/** @format */
const Header = () => {
  const [value, setValue] = useState("")

  const className =
    "flex justify-between flex-none border-none [&>input]:border-none [&>input]:rounded [&>input]:bg-inherit [&>input:focus]:ring-[1px] [&>input]:transition-colors [&>input]:duration-300 [&>input]:overflow-scroll [&>input]:resize-none [&>input:focus]:outline-none [&>input]:select-none h-7  pt-2 focus:bg-neutral-700/25 focus:ring-indigo-500  [&>input]:w-full  [&>input]:pl-1 [&>input]:pr-6 [&>input:focus]:ring-indigo-500 [&>input]:text-sm [&>input:focus]:bg-neutral-700/25 pl-1 pr-6"

  return (
    <div className={className}>
      <input
        type="text"
        name="title"
        size={10}
        placeholder={"title"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

const Body = () => {
  const [value, setValue] = useState("")
  return (
    <div className="grow nondrag max-h-full min-h-0 px-1 pt-1 rounded-[6px] flex text-sm">
      <textarea
        className="w-full resize-none bg-inherit px-1 pt-1  focus:bg-neutral-700/25 transition-colors  duration-300 focus:ring-indigo-500 focus:ring-[1px] rounded-md focus:outline-none"
        placeholder="note..."
        spellCheck={false}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export function NoteCard() {
  return (
    <div className="min-w-[280px] w-[350px] max-w-[350px] min-h-[200px] h-[150px] select-none border rounded-md flex flex-col ">
      <Header />
      <Body />
      {/* <TopIcons id={id} />
      <BottomIcons id={id} /> */}
    </div>
  )
}

export function CodeCard() {
  const codeValue =
    "axios.get('/user/12345') \n.catch(function (error) { \nif (error.response) {\n console.log(error.response.data);\n console.log(error.response.status);\n console.log(error.response.headers);\n} else if (error.request) {\n  console.log(error.request);\n} else {\n  console.log('Error', error.message);\n}\nconsole.log(error.config); \n});"
  const [value, setValue] = useState(codeValue)

  return (
    <div className="min-w-[280px] w-[350px] min-h-[200px] h-fit max-h-[300px] select-none border rounded-md flex flex-col ">
      <Header />
      <Editor
        value={value}
        highlight={(code) => highlight(code, languages.js)}
        padding={8}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 13,
        }}
        className="h-full w-full  pointer-events-none	"
        textareaClassName="transition-colors pointer-event-none duration-300 active:bg-indigo-500/15  "
      />{" "}
      {/* <TopIcons id={id} />
        <BottomIcons id={id} /> */}
    </div>
  )
}

export const UrlCard = () => {
  return (
    <div className="relative select-none max-w-[350px] flex  p-1 gap-1 bg-card rounded-md overflow-hidden border ">
      <img
        src="https://assets-global.website-files.com/5e0a5d9d743608d0f3ea6753/5f35091372cfa97ba7438461_daily.dev%20-%20Favicon%4030x.ico"
        className="rounded-lg pointer-events-none -[2rem] size-[2rem]"
        // alt="favicon"
        // aria-hidden
        // onError={() => setData(id, {favicon: ""})}
      />

      <a
        href="https://news.ycombinator.com/"
        target="_blank"
        className="max-w-[300px] min-h-full  flex flex-col "
      >
        <p className="grow text-start w-fit max-w-[300px]  leading-none truncate transition-all duration-300">
          Daily Dev
        </p>

        <p className="text-xs text-start  truncate max-w-full  transition-all duration-300">
          daily dev is a professional network for developers to learn,
          collaborate, and grow together. Developers come to daily.dev to
          discover a wide variety of professional knowledge, create groups where
          they can collaborate with other developers they appreciate, and
          discuss the latest trends in the developer ecosystem.
        </p>
      </a>
    </div>
  )
}
