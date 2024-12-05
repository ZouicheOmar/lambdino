/** @format */

import { openDrawer } from "@/utils/positions"

import { toast } from "sonner"
import { useUserStore } from "@/stores/user"

export const filesSlice = (set, get) => ({
  fileName: "",

  getLastFile() {
    const cb = () => {
      const lastFile = localStorage.getItem("last_file")
      if (lastFile !== "") {
        get().getCards(lastFile)
      } else {
        openDrawer()
        set((state) => {
          state.message = "no files selected, please create or pick a file"
        })
      }
    }

    setTimeout(cb, 500)
  },

  async writeThisFile(showToast = true) {
    const { cards, getCards, fileName, closedBoards } = get()
    // const userId = useUserStore.getState().userId

    const request = {
      RequestItems: {
        messBoard: [],
      },
    }

    const makeRequest = (userId: string, boardName: string, cards: Object) => {
      return {
        PutRequest: {
          Item: {
            userId: {
              S: userId,
            },
            board: {
              S: boardName,
            },
            cards: {
              S: JSON.stringify(cards),
            },
          },
        },
      }
    }

    const firstCard = makeRequest(userId, fileName, cards)
    request.RequestItems.messBoard.push(firstCard)

    const closedBoardsArray = Object.entries(closedBoards)
    for (let i = 1; i < closedBoardsArray.length; i++) {
      const boardName = closedBoardsArray[i][0]
      const cards = closedBoardsArray[i][1]
      const input = makeRequest(userId, boardName, cards)
      request.RequestItems.messBoard.push(input)
    }

    toast.success("saved")
  },

})
