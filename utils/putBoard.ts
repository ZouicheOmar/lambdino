/** @format */

import {PutItemCommand} from "@aws-sdk/client-dynamodb"
import {dbclient} from "./dbClient"

export default async function putBoard(userId, boardName) {
  try {
    const item = {
      TableName: process.env.NEXT_PUBLIC_AWS_DB_TABLENAME,
      Item: {
        userId: {
          S: userId,
        },
        board: {
          S: boardName,
        },
        cards: {
          S: "{}",
        },
      },
    }

    const command = new PutItemCommand(item)
    const result = await dbclient.send(command)
    return result
  } catch (err) {
    console.log(err)
    throw err
  }
}
