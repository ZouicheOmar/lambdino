/** @format */

import axios from "axios"
import {getData} from "../utils/call-lamba"
import {LAMBDA} from "../lib/constants"

//THIS IS WHERE I LOAD THE BOARDS AND THE CARDS ETC...
//IT'S LITERRALY LIKE COMBINING THE SERVER AND THE CLIENT SIDE
// SO THINK ABOUT HOW IVE STRUCTURES THE CALLS TO THE SERVER FROM THE CLIENT

export async function GET() {
  const data = await getData(LAMBDA.HELLO)
  return Response.json({data})
}
