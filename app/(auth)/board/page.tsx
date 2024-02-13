/** @format */
"use client"

import AuthNav from "@/components/AuthNav"
import Panel from "@/components/Panel/Panel"
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

export default function Page() {
  useEffect(() => {
    const calldb = async () => {
      //   const tables = await listTables()
      //   const result = await describeTable()
      //   const put = await putItem()
      //   const item = await getItem()
      //   const putJson = await putItemWithJson()
      //   const items = await queryItems()
      //   const table = await createTable()
    }
    calldb()
  }, [])

  return (
    <div className="absolute w-screen h-screen bg-red-900/10">
      <AuthNav />
      {/* <Panel /> */}
      <div className="w-full">
        <p>board</p>
        <Button onPointerDown={() => console.log("clicked")}> click</Button>
      </div>
    </div>
  )
}

//   dynamodb.putItem(params, function(err, data) {
//     if (err) console.log(err);
//     else console.log("Success");
//   });
