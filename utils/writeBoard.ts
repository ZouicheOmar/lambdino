/** @format */

import {dbclient} from "./dbClient"
import {BatchWriteItemCommand} from "@aws-sdk/client-dynamodb"

export async function writeBoards(input) {
  try {
    const command = new BatchWriteItemCommand(input)
    const response = await dbclient.send(command)
    return response.$metadata.httpStatusCode
  } catch (err) {
    console.log(err)
    throw err
  }
}
