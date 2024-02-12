/** @format */

"use client"
import {
  describeTable,
  listTables,
  putItem,
  getItem,
  queryItems,
  createTable,
  putItemWithJson,
} from "@/app/utils/call-dynamo"
import {useEffect} from "react"

export default function Page() {
  useEffect(() => {
    const foo = async () => {
      //   const tables = await listTables()
      //   const result = await describeTable()
      //   const put = await putItem()
      //   const item = await getItem()
      //   const putJson = await putItemWithJson()
      //   const items = await queryItems()
      //   const table = await createTable()
    }
    // console.log("in use effect")
    foo()
  }, [])

  return (
    <div className="w-full">
      <p>this is board page</p>
    </div>
  )
}

// var params = {
//     TableName: "Movies",
//     Item: {
//       "year": 2010,
//       "title": "Inception"
//     }
//   };

//   dynamodb.putItem(params, function(err, data) {
//     if (err) console.log(err);
//     else console.log("Success");
//   });
