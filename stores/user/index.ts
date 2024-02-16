/** @format */

import {create} from "zustand"
import {immer} from "zustand/middleware/immer"

export const useUserStore = create(
  immer((set, get) => ({
    userId: "",
    setUserId(userId: string) {
      set((s) => {
        s.userId = userId
      })
    },
  }))
)
