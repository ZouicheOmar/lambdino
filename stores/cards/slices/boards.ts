/** @format */

import {v4 as uuidv4} from "uuid"
import {animate} from "framer-motion"

import {getRectById} from "@/utils/positions"

import {AXIOS_CONFIG} from "@/lib/constants"
import {BOARDS} from "@/lib/cards"

export const boardsSlice = (set, get) => ({
  boards: [],
  getBoards() {
    const newState = []
    const list = Object.entries(BOARDS)

    set((s) => {
      for (let i = 0; i < list.length; i++) {
        newState.push(list[i][0])
      }
      s.boards = newState
    })
  },
})
