/** @format */

export const arrangeSlice = (get, set) => ({
  arranged: [],
  arrangedNotesAndCodes: [],

  getArrangedCards() {
    console.log("in getArrangedCards")
  },

  getArrangedNotesAndCodes() {
    const cards = get().cards
    const cardsArray = Object.entries(cards)
    const {x, y} = getRectById("board")
    let orderedCards = []

    for (let i = 0; i < cardsArray.length; i++) {
      const {id, position, size, type} = cardsArray[i][1]
      const distance2d = moduleCarre(x, y, position.left, position.top)
      const newItem = {
        id: id,
        top: position.top,
        left: position.left,
        total: position.top + position.left,
        // total: distance2d,
        width: size.width,
        height: size.height,
      }

      if (["note", "code"].includes(type)) {
        orderedCards.push(newItem)
      }
    }

    for (let i = 0; i < orderedCards.length; i++) {
      for (let j = 0; j < orderedCards.length; j++) {
        if (orderedCards[j].total >= orderedCards[i].total) {
          const swipe = orderedCards[i]
          orderedCards[i] = orderedCards[j]
          orderedCards[j] = swipe
        } else {
          continue
        }
      }
    }

    set((state) => {
      state.arrangedNotesAndCodes = orderedCards
    })

    return orderedCards
  },
})
