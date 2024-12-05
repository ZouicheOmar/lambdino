/** @format */

import { dbclient } from "./dbClient"
import { QueryCommand } from "@aws-sdk/client-dynamodb"

/*FIX: là où typer aurait été cool psq ça m'aurait donné la forme de la donné retournée mais bon*/
export async function queryBoardsByUserId(userId: string) {
  console.log("WARNING : CALL TO DYNAMODB")
  try {
    const command = new QueryCommand({
      TableName: process.env.NEXT_PUBLIC_AWS_DB_TABLENAME,
      ExpressionAttributeValues: {
        ":condition": {
          S: userId,
        },
      },
      KeyConditionExpression: "userId = :condition",
      ProjectionExpression: "board",
    })
    const response = await dbclient.send(command)
    return response.Items
  } catch (err) {
    console.log("err", err)
    throw err
  }
}
