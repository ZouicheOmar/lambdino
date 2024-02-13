/** @format */
"use client"

import AuthNav from "@/components/AuthNav"
import Panel from "@/components/panel/Panel"
import Board from "@/components/board/Board"
import {Button} from "@/components/ui/button"
import {
  describeTable,
  listTables,
  putItem,
  getItem,
  queryItems,
  createTable,
  putItemWithJson,
} from "@/utils/call-dynamo"
import {useEffect} from "react"

const OGWrapperStyle = {
  position: "fixed",
  width: "100%",
  height: "100%",
  top: "0",
  left: "0",
  contain: "strict",
  margin: "0",
  boxSizing: "border-box",
  display: "flex",
  paddingLeft: "11rem",
  paddingTop: "2rem",
  alignItems: "flex-start",
  justifyContent: "flex-start",
}

export default function Page() {
  return (
    <div className="fixed w-full h-full top-0 left-0 m-0 pl-[11rem] pt-[2rem] box-border flex">
      <Panel />
      <Board />
    </div>
  )
}

// useEffect(() => {
//   const calldb = async () => {
//     //   const tables = await listTables()
//     //   const result = await describeTable()
//     //   const put = await putItem()
//     //   const item = await getItem()
//     //   const putJson = await putItemWithJson()
//     //   const items = await queryItems()
//     //   const table = await createTable()
//   }
//   calldb()
// }, [])
