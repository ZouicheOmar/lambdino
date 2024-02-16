/** @format */

import {S3Client} from "@aws-sdk/client-s3"

export const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_SECRET,
  },
})
