/** @format */

import {openDrawer} from "@/utils/positions"

import {writeBoards} from "@/utils/writeBoard"

import {toast} from "sonner"
import {useUserStore} from "@/stores/user"

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
    const {cards, getCards, fileName, closedBoards} = get()
    const userId = useUserStore.getState().userId

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

    const saving = await writeBoards(request)
    toast.success("saved")
    //makeRequestInput for cards
    //if closedBoards.length > 1
    // makeRequestInput foreach element

    //when done, return the total request item

    // if (fileName === "") {
    //   toast.error("Can't save, not in a board", {})
    //   return
    // }

    // const data = {
    //   cards: cards,
    // }
  },

  // async createFile(fileName: string) {
  //   const getCards = get().getCards
  //   const data = {
  //     fileName: fileName,
  //   }

  //   await axios
  //     .post(ROUTES.CREATE_FILE, data, AXIOS_CONFIG)
  //     .then((res) => {
  //       console.log(`file supposedly created : ${res.data}`)
  //       getCards(fileName)
  //       closeDrawer()
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // },
})
