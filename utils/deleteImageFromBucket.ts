/** @format */

import {s3} from "./s3Client"
import {DeleteObjectCommand} from "@aws-sdk/client-s3"

export async function deleteImageFromBucket(userId, board, imageId) {
  try {
    const input = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: `${userId}_${board}_${imageId}`,
    }

    const command = new DeleteObjectCommand(input)
    const result = await s3.send(command)
    return result
  } catch (err) {
    console.log(err)
    throw err
  }
}
