/** @format */

import axios from "axios"

export async function getData(url) {
  const response = await axios(url)
  return response.data
}
