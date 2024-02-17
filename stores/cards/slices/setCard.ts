/** @format */

export const setCardSlice = (set, get) => ({
  setData(id, data) {
    const card = get().cards[id]
    if (["note", "markdown"].includes(card.type)) {
      set((state) => {
        state.cards[id].data = data
      })
    } else if (card.type === "code") {
      set((state) => {
        state.cards[id].data.code = data
      })
    } else if (card.type === "url") {
      set((state) => {
        state.cards[id] = {...state.cards[id], ...data}
      })
    } else {
      console.log("this card has note type or id not found")
    }
  },
  setTitle(e, id) {
    const value = e.target.value
    set((state) => {
      state.cards[id].title = value
    })
  },
  setPosition: (id, data) => {
    set((state) => {
      state.cards[id].position = data
    })
  },
  setSize: (id, data) => {
    set((state) => {
      state.cards[id].size = data
    })
  },
})
