/** @format */
import getMetaData from "metadata-scraper"
import urlMetadata from "url-metadata"

export async function POST(req: Request) {
  const {url} = await req.json()
  try {
    const metadata = await urlMetadata(url)
    return Response.json(metadata)
  } catch (err) {
    console.log(err)
  }
}
