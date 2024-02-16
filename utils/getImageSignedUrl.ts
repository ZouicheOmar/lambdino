/** @format */

import useInitBoard from "@/hooks/useInitBoard"
import {s3} from "@/utils/s3Client"
import {ChecksumAlgorithm, PutObjectCommand} from "@aws-sdk/client-s3"
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"

const computeSHA256 = async (file: File) => {
  const buffer = await file.arrayBuffer()
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  return hashHex
}

export async function getImageSignedUrl(type: string, fileName: string) {
  const command = new PutObjectCommand({
    Bucket: "omarzouichetestbucket",
    Key: fileName,
    ContentType: type,
    // ContentLength : size
    // ChecksumSHA256 : checksum,
    // Metadata : {
    //     userId : userId,
    //     board : boardName
    // }
  })
  const signedUrl = await getSignedUrl(s3, command, {
    expiresIn: 60,
  })
  return signedUrl
}
