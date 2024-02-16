/** @format */
import {GetItemCommand} from "@aws-sdk/client-dynamodb"
import {dbclient} from "./dbClient"

export default async function queryBoardItems(userId: string, board: string) {
  console.log("WARNING : CALL TO DYNAMODB")
  try {
    const query = {
      TableName: process.env.NEXT_PUBLIC_AWS_DB_TABLENAME,
      Key: {
        userId: {
          S: userId,
        },
        board: {
          S: board,
        },
      },
      AttributesToGet: ["cards"],
    }
    const command = new GetItemCommand(query)
    const response = await dbclient.send(command)
    const {
      cards: {S},
    } = response.Item
    return S
  } catch (err) {
    console.error(err)
    throw err
  }
}

function getJSONSize(json) {
  const size = new TextEncoder().encode(JSON.stringify(json)).length
  console.log(
    `object size in : ${size / 1024}kb, the actual length is : ${size}`
  )
}
