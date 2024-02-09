/** @format */

const creds = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
}

const dbclient = new DynamoDBClient({
  region: "eu-west-3",
  credentials: creds,
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

export async function describeTables() {
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
