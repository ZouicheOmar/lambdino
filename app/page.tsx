/** @format */

import axios from "axios"
import {renderToString} from "react-dom/server"

// async function getData() {
//   const url =
//     "https://ked326zy4r5vsxpzmavuj6ri4m0lvhnm.lambda-url.eu-north-1.on.aws/"
//   const res = await fetch(url)

//   if (!res.ok) {
//     throw new Error("Failed to fetch data")
//   }

//   console.log(res.body)
// }

async function getData() {
  const url =
    "https://xqmf3tylybjkosy232bgrj4agy0kwuzj.lambda-url.eu-west-3.on.aws/"

  const response = await axios(url)
  return response.data
}

export default async function Home() {
  const data = await getData()

  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between  text-sm lg:flex">
      <p className="text-xl">hello lambda</p>
      <pre>
        <code>{JSON.stringify(data, null, 4)}</code>
      </pre>
    </div>
  )
}
