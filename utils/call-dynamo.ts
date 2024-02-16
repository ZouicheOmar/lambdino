/** @format */
import {
  DynamoDBClient,
  ListTablesCommand,
  DescribeTableCommand,
  QueryCommand,
  PutItemCommand,
  GetItemCommand,
  CreateTableCommand,
  BatchGetItemCommand,
  BatchWriteItemCommand,
} from "@aws-sdk/client-dynamodb"

// import {EXAMPLE_BOARD, BIG_BOARD} from "@/app/lib/constants"

const dbclient = new DynamoDBClient({
  region: "eu-west-3",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_SECRET,
  },
})

export async function listTables() {
  try {
    const command = new ListTablesCommand()
    const results = await dbclient.send(command)
    results.TableNames.forEach(function (item, index) {
      console.log(item)
    })
  } catch (err) {
    console.error(err)
  }
}

export async function describeTable() {
  try {
    const command = new DescribeTableCommand({
      TableName: "cards",
    })
    const results = await dbclient.send(command)
    console.log(results.Table)
  } catch (err) {
    console.error(err)
  }
}

export async function getItem() {
  try {
    // const input = {
    //   TableName: "cards",
    //   Key: {
    //     cardsPartitionKey: {
    //       S: "noteCard",
    //     },
    //   },
    // }

    const input = {
      TableName: "fromvscode",
      Key: {
        Board: {
          S: "boarda",
        },
        Card: {
          S: "card C",
        },
      },
    }

    const command = new GetItemCommand(input)
    const response = await dbclient.send(command)
    console.log(response.Item)
    const object = response.Item
    const size = new TextEncoder().encode(JSON.stringify(object)).length
    console.log(
      `object size in : ${size / 1024}kb, the actual length is : ${size}`
    )
  } catch (err) {
    console.error(err)
  }
}

export async function queryItems() {
  try {
    const command = new QueryCommand({
      TableName: "movies",
      ExpressionAttributeValues: {
        ":condition": {
          S: "boarda",
        },
      },
      KeyConditionExpression: "board = :condition",
    })
    const reponse = await dbclient.send(command)
    console.log(reponse)
  } catch (err) {
    console.log(err)
  }
}

export async function putItem() {
  try {
    const item = {
      TableName: "cards",
      Item: {
        cardsPartitionKey: {
          S: "the abyss",
        },
        id: {
          S: "theabyssfakeid",
        },
        left: {
          N: "113",
        },
        top: {
          N: "92",
        },
      },
    }

    const command = new PutItemCommand(item)
    const result = await dbclient.send(command)
    console.log(result)
  } catch (err) {
    console.log(err)
  }
}

export async function createTable() {
  try {
    const input = {
      AttributeDefinitions: [
        {
          AttributeName: "Board",
          AttributeType: "S",
        },
        {
          AttributeName: "Card",
          AttributeType: "S",
        },
      ],
      KeySchema: [
        {
          AttributeName: "Board",
          KeyType: "HASH",
        },
        {
          AttributeName: "Card",
          KeyType: "RANGE",
        },
      ],

      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
      TableName: "fromvscode",
    }
    const command = new CreateTableCommand(input)
    const reponse = await dbclient.send(command)
    console.log(reponse)
  } catch (err) {
    console.log(err)
  }
}

export async function putItemWithJson() {
  /**
   * If item size < 400kb..
   * else {
   * splice a 400kb from the item,
   * if the second half exceeds 400kb, split it again...
   * }
   */
  try {
    // const object = JSON.stringify({
    //   name: "hannibal",
    //   place_of_birth: "ethipia",
    //   role: "russian military tactician",
    //   languages: ["french", "africanos", "russian", "english"],
    //   date_of_birth: new Date(),
    // })
    const object = JSON.stringify(BIG_BOARD)
    const size = new TextEncoder().encode(JSON.stringify(object)).length
    console.log(
      `object size in kb : ${size / 1024}, the actual length is : ${size}`
    )
    const item = {
      TableName: "fromvscode",
      Item: {
        Board: {
          S: "boarda",
        },
        Card: {
          S: "card C",
        },
        title: {
          S: "this is supposed to contain the whole board in a single json object",
        },
        content: {
          S: object,
        },
      },
    }

    const command = new PutItemCommand(item)
    const result = await dbclient.send(command)
    console.log(result)
  } catch (err) {
    console.log(err)
  }
}

export async function writeItems() {
  const tableName = ""
  try {
    const input = {
      RequestItems: {
        notes: [
          {
            PutRequest: {
              Item: {
                user001: {
                  S: "apt",
                },
                board001: {
                  S: "ast",
                },
                content: {
                  S: "content for board one",
                },
              },
            },
          },
          {
            PutRequest: {
              Item: {
                userId: {
                  S: "userId",
                },
                board: {
                  S: "ast",
                },
                cards: {
                  S: "content for board one",
                },
              },
            },
          },
          {
            PutRequest: {
              Item: {
                user001: {
                  S: "apt",
                },
                board001: {
                  S: "astt",
                },
                content: {
                  S: "second content",
                },
              },
            },
          },
          {
            PutRequest: {
              Item: {
                user001: {
                  S: "apt",
                },
                board001: {
                  S: "st",
                },
                content: {
                  S: "third content",
                },
              },
            },
          },
        ],
      },
    }
    const command = new BatchWriteItemCommand(input)
    const response = await dbclient.send(command)
    console.log(response)
  } catch (err) {
    console.log(err)
    throw err
  }
}

// export async function createTable() {
//     try {
//         const input = {
//             TableName : "alexandreLeGrand"
//         }
//         const command = new CreateTableCommand()
//         const result = await dbclient.send(command)
//     } catch (err) {
//         console.log(err)
//     }
// }
