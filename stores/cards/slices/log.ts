/** @format */

export const logSlice = (set, get) => ({
  logState() {
    // const cards = get().cards;
    // console.log("cards", cards);
    const fileName = get().fileName

    const openBoard = get().openBoard
    console.log(`openBoard : ${openBoard}, fileName : ${fileName}`)

    const closedBoards = get().closedBoards
    //  console.log("closedBoards", closedBoards)

    const boards = get().boards
    // console.log("boards", boards)
  },
})
