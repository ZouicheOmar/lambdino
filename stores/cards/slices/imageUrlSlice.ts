/** @format */

export const imageUrlSlice = (set, get) => ({
  url: "",
  setUrl(url) {
    set((s) => {
      s.url = url
    })
  },
})
