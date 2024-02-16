/** @format */

import {queryBoardsByUserId} from "@/utils/queryBoardsByUserId"
import putBoard from "@/utils/putBoard"
import {useUserStore} from "@/stores/user"
import {closeDrawer} from "@/utils/positions"

export const boardsSlice = (set, get) => ({
  openBoard: "", //current session openned board
  closedBoards: {}, //current session closed boards, this will save the boards and their content
  boards: [], //boards list

  async setBoardsList(userId) {
    queryBoardsByUserId(userId)
      .then((res) => {
        if (res.length === 0) {
          return
        }
        const newState = []
        // const list = JSON.parse(res)
        const list = res

        set((s) => {
          for (let i = 0; i < list.length; i++) {
            const {
              board: {S},
            } = list[i]
            newState.push(S)
          }

          s.boards = newState
        })
      })
      .catch((err) => {
        console.log(err)
        throw err
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
