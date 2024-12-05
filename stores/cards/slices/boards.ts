/** @format */

import { queryBoardsByUserId } from "@/utils/queryBoardsByUserId"
import putBoard from "@/utils/putBoard"
import { useUserStore } from "@/stores/user"
import { closeDrawer } from "@/utils/positions"
import { DEMO_BOARD_LIST } from "@/lib/constants"

export const boardsSlice = (set, get) => ({
  openBoard: "",
  closedBoards: {},
  boards: [],

  setBoards() {
    return set((state) => {
      state.boards = DEMO_BOARD_LIST;
    })
  },

  async createBoard(boardName: string) {
    const userId = useUserStore.getState().userId
    const newBoard = await putBoard(userId, boardName)
    if (newBoard) {
      get().getCards(boardName)
      set((s) => {
        s.boards.push(boardName)
        return
      })
      closeDrawer()
    }
  },
})
