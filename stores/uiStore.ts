/** @format */

import axios from "axios"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { animate } from "framer-motion"
import { useCardStore } from "./cards"

const useUiStore = create(
  immer((set, get) => ({
    files_list: "",
    file_name: "",

    mx: 0,
    my: 0,

    insertImageX: 0,
    insertImageY: 0,

    uiCards: {},

    anySelected: 0,
    select: false,
    selectedFile: "",

    translateX: 0,
    translateY: 0,

    insertImageDialogOpen: false,

    zoom: 1,

    fitScreen: false,

    uiState: () => {
      const uicards = get().uiCards
    },

    setTX: (value, element) => {
      set((state) => {
        state.translateX = value
        animate(
          element,
          {
            x: state.translateX,
          },
          {
            ease: "anticipate",
            stiffness: 1000,
            damping: 0,
            duration: 0,
          }
        )
        return
      })
    },
    setTY: (value, element) => {
      set((state) => {
        state.translateY = value
        animate(
          element,
          {
            y: state.translateY,
          },
          {
            ease: "anticipate",
            stiffness: 1000,
            damping: 0,
            duration: 0,
          }
        )
        return
      })
    },
    zoomIn: () => {
      set((state) => {
        if (state.zoom <= 1.7) {
          state.zoom += 0.05
          state.fitScreen = false
          return
        } else {
          return
        }
      })
    },
    zoomOut: () => {
      set((state) => {
        if (state.zoom >= 0.4) {
          state.zoom -= 0.05
          state.fitScreen = false
          return
        } else {
          return
        }
      })
    },
    zoomReset: () => set(() => ({ zoom: 1 })),

    setMx: (value) => set(() => ({ mx: value })),
    setMy: (value) => set(() => ({ my: value })),

    setInsertImageX: (value) => set(() => ({ insertImageX: value })),
    setInsertImageY: (value) => set(() => ({ insertImageY: value })),

    center: () => {
      const board = document.getElementById("board")

      animate(
        board,
        {
          x: 0,
          y: 0,
        },
        { duration: 0.3 }
      )

      setTimeout(() => {
        set((state) => {
          state.translateX = 0
          state.translateY = 0
          // state.zoom = 1;
        })
      }, 310)
    },

    zoomToFit() {
      const cards = useCardStore.getState().cards

      for (let i = 0; i < Object.entries(cards).length; i++) {
        // const id = Object.entries(cards)[i][0]
        const card = Object.entries(cards)[i][1]
        const {
          position: { top, left },
        } = card
      }
    },

    fitCanva: (ratio) => {
      set((state) => {
        state.fitScreen = true
        if (ratio <= 0.4) {
          state.zoom = 0.4
        }
        state.zoom = ratio
      })
    },

    topLeft: () => {
      const board = document.getElementById("board")
      animate(
        board,
        {
          // x: `-${width / 4}px`,
          // y: "50%",
          x: 0,
          y: 0,
          origin: "50%",
        },
        {
          ease: "anticipate",
          // stiffness: 1000,
          // damping: 0,
          duration: 0.5,
          bounce: 0,
        }
      )
      set((state) => {
        state.translateX = 0
        state.translateY = 0
        state.zoom = 1
        state.fitScreen = false
      })
    },

    getFiles: async () => {
      /*FIX: c'est quoi là ?*/
      axios
        .get(ROUTES.FILES_LIST, AXIOS_FORMDATA_CONFIG)
        .then((res) => {
          set((state) => {
            state.files_list = res.data
          })
        })
        .catch((err) => {
        })
    },

    logState: () => {
      const state = get().uiCards
    },

    addUiCard: (card) => {
      set((state) => {
        state.uiCards = { ...state.uiCards, ...card }
      })
    },

    deleteUiCard: (id) => {
      set((state) => {
        delete state.uiCards[id]
      })
    },

    initCards: () => {
      const cards = useCardStore.getState().cards;
      let cards_array = Object.entries(cards);
      let emptyList = {}

      Object.entries(cards).forEach((card) => {
        const { type, id,
          position: { top, left },
          size: { width, height } } = card[1];
        const obj = {
          [id]: {
            selected: false,
            top: top,
            left: left,
            width: width ?? 100,
            height: height ?? 100,
          },
        }
        emptyList = { ...emptyList, ...obj }
      })
      set((state) => {
        state.uiCards = { ...emptyList }
      });
    },

    toggleSelectCard: (id, value) => {
      const cards = get().uiCards
      let n = 0

      set((state) => {
        state.uiCards[id].selected = !state.uiCards[id].selected || value
        return
      })

      for (const id in cards) {
        if (cards[id].selected) {
          n += 1
        } else {
          n -= 1
        }
      }

      set((state) => {
        state.anySelected = n
      })
    },

    selectAll: () => {
      for (const id in get().uiCards) {
        set((state) => {
          state.uiCards[id].selected = true
        })
      }

      set((state) => {
        state.anySelected = get().uiCards.length
      })
    },

    deselectAll: () => {
      for (const id in get().uiCards) {
        set((state) => {
          state.uiCards[id].selected = false
        })
      }

      set((state) => {
        state.anySelected = 0
      })
    },

    toggleSelect: () => {
      const select = get().select
      if (select) {
        get().deselectAll()
        set((state) => {
          state.select = false
        })
      } else {
        set((state) => {
          state.select = true
        })
      }
    },

    selectModeOff: () => {
      get().deselectAll()
      set((state) => {
        state.select = false
      })
    },

    toggleInsertImageDialogOpen: (value) => {
      set((state) => {
        state.insertImageDialogOpen = value
      })
    },
  }))
)

export default useUiStore
