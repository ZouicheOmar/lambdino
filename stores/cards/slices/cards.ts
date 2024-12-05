/** @format */
import { useUserStore } from "@/stores/user"
import useUiStore from "@/stores/uiStore"
import { DEMO_BOARDS } from "@/lib/constants"

// import { deleteImageFromBucket } from "@/utils/deleteImageFromBucket"
// import queryBoardItems from "@/utils/queryBoardItems"

import { v4 as uuidv4 } from "uuid"

import { getRectById } from "@/utils/positions"

export const cardsSlice = (set, get) => ({
  cards: {},
  idList: [],
  ids: [],

  getCards(boardName) {
    const cards = DEMO_BOARDS[boardName].cards;
    let ids = [];
    for (let id in cards) {
      ids.push(id);
    }

    set((state) => {
      state.cards = cards;
      state.idList = Object.keys(cards);
      state.ids = ids;
      state.fileName = boardName;
      state.openBoard = boardName;
      if (state.closedBoards[boardName]) {
        delete state.closedBoards[boardName];
      }
    })
    useUiStore.getState().initCards()

  },

  addCard(type: string | null) {
    const { mx, my, addUiCard } = useUiStore.getState()
    const { top, left } = getRectById("board")
    const id = uuidv4().toString()

    let size = { width: 300, height: 200 }
    let data = ""
    let urlCard = {}

    if (type === "url") {
      console.log("none")
    }
    if (type === "code") {
      data = {
        lang: "javascript",
        code: "function add(a, b) {\n  return a + b;\n}",
      }
    }
    if (type === "markdown") {
      size = { width: 250, height: 350 }
      data = "### Hi ! Double tap to edit"
    }
    if (type === "url") {
      console.log("trying to add a url card, ")
      size = { width: 326, height: 40 }
      data = "url"
      urlCard = {
        description: "",
        favicon: "",
        href: "",
        already_added: false,
      }
    }

    const baseCard = {
      [id]: {
        id: id,
        type: type,
        position: { left: mx - left, top: my - top },
        size: size,
        shortcut: "",
        title: "",
        data: data,
        folded: false,
        tags: [],
        ...urlCard,
      },
    }

    const uicard = {
      [id]: {
        selected: false,
        top: top,
        left: left,
        width: size.width,
        height: size.height,
      },
    }

    addUiCard(uicard)
    set((state) => {
      state.ids = [...state.ids, id]
      state.cards = { ...state.cards, ...baseCard }
      return
    })
  },

  addImageCard: (id) => {
    useUiStore.getState().selectModeOff()

    const fileName = get().fileName
    const addUiCard = useUiStore.getState().addUiCard

    const { top, left } = getRectById("board")
    const mx = useUiStore.getState().insertImageX
    const my = useUiStore.getState().insertImageY

    const size = {
      width: 300,
      height: 200,
    }
    const aspect = size.width / size.height
    const newCard = {
      [id]: {
        id: id,
        type: "image",
        board: fileName,
        position: { left: mx + left, top: my + top },
        size: size,
        aspect: aspect,
        title: "",
        folded: false,
        tags: [],
      },
    }

    const uicard = {
      [id]: {
        selected: false,
        top: top,
        left: left,
        width: size.width,
        height: size.height,
      },
    }

    addUiCard(uicard)

    set((state) => {
      state.ids = [...state.ids, id]
      state.cards = { ...state.cards, ...newCard }
      return
    })
  },

  deleteCard: (id) => {
    const { type } = get().cards[id]
    set((s) => {
      delete s.cards[id]
    })
    useUiStore.getState().deleteUiCard(id)
    if (type === "image") {
      const userId = useUserStore.getState().userId
      const openBoard = get().openBoard
      // const result = await deleteImageFromBucket(userId, openBoard, id)
    }
  },
})
